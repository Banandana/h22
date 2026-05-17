# Torque DB — Example SQL Queries

Common query patterns for `research/raw-data/torque-specs/h22-torques.db`.

## 1. All fasteners for a given assembly

```sql
SELECT fastener_name, thread_nominal_mm, thread_pitch_mm, qty,
       lubrication, torque_json, notes
FROM torques
WHERE assembly = 'cylinder-head'
ORDER BY fastener_name;
```

## 2. Fasteners by thread size and role

```sql
SELECT assembly, fastener_name, role,
       thread_nominal_mm || 'mm x ' || thread_pitch_mm || 'mm' AS thread,
       torque_json
FROM torques
WHERE thread_nominal_mm = 10
  AND role = 'tty-stretch'
ORDER BY assembly, fastener_name;
```

## 3. All single-source TTY rows (lowest confidence corroboration)

```sql
SELECT id, assembly, fastener_name, vote_strength, consensus_strategy
FROM torques
WHERE role = 'tty-stretch'
  AND single_source = 1
ORDER BY assembly, fastener_name;
```

## 4. Torque steps for a specific fastener

```sql
SELECT fastener_name, torque_json, lubrication, reusable, notes
FROM torques
WHERE id = 'BB6-p136-cylhead-headbolt';
-- torque_json contains the steps array:
-- [{"pass":1,"nm":39,"kgfm":4,"lbft":29,"angle_deg":null}, ...]
```

## 5. ARP aftermarket equivalents for an OEM assembly

```sql
SELECT oem_role, arp_part_number, arp_torque_nm, arp_lubrication, notes, source_url
FROM arp_xrefs
WHERE oem_role = 'tty-stretch'
ORDER BY arp_part_number;
```

## 6. Fasteners by system with vote strength filter

```sql
SELECT assembly, fastener_name, system, vote_strength, confidence
FROM torques
WHERE system = 'engine'
  AND vote_strength >= 0.75
ORDER BY assembly, fastener_name;
```

## 7. Invocation provenance for a torque row

```sql
SELECT t.id, t.fastener_name, ti.agreement, i.model_id, i.run, i.temperature
FROM torque_invocations ti
JOIN torques t ON ti.torque_id = t.id
JOIN invocations i ON ti.invocation_id = i.id
WHERE t.id = 'BB6-p136-cylhead-headbolt'
ORDER BY ti.agreement DESC, i.model_id;
```

## 8. FTS5 search across markdown views

```sql
SELECT view, section, body
FROM markdown_fts
WHERE markdown_fts MATCH 'flywheel bolt'
LIMIT 10;
```

## 9. Disputed rows requiring manual resolution

```sql
SELECT id, assembly, fastener_name, candidates_json, resolved
FROM disputes
WHERE resolved = 0
ORDER BY id;
```

## 10. Summary statistics by assembly

```sql
SELECT assembly,
       COUNT(*) AS fastener_count,
       SUM(CASE WHEN role = 'tty-stretch' THEN 1 ELSE 0 END) AS tty_count,
       SUM(CASE WHEN single_source = 1 THEN 1 ELSE 0 END) AS single_source_count,
       AVG(vote_strength) AS avg_vote_strength,
       MIN(confidence) AS min_confidence
FROM torques
GROUP BY assembly
ORDER BY fastener_count DESC;
```

## 11. Find fasteners by Honda part number

```sql
SELECT id, assembly, fastener_name, honda_part_number, thread_nominal_mm,
       thread_pitch_mm, torque_json
FROM torques
WHERE honda_part_number IS NOT NULL
  AND honda_part_number != ''
ORDER BY honda_part_number;
```

## 12. Cross-reference: OEM torque vs ARP equivalent

```sql
SELECT t.assembly, t.fastener_name AS oem_fastener,
       t.torque_json AS oem_torque,
       a.arp_part_number, a.arp_torque_nm AS arp_torque_nm,
       a.notes AS arp_notes
FROM torques t
JOIN arp_xrefs a ON t.assembly = a.oem_role
WHERE t.oem = 1
ORDER BY t.assembly;
```

## 13. Pages covered per chapter

```sql
SELECT c.name AS chapter, c.manual, COUNT(p.page) AS page_count
FROM chapters c
LEFT JOIN pages p ON p.chapter_id = c.id
GROUP BY c.id
ORDER BY page_count DESC;
```

## 14. Low-confidence rows needing review

```sql
SELECT id, assembly, fastener_name, confidence, vote_strength,
       consensus_strategy, notes
FROM torques
WHERE confidence = 'low'
   OR (confidence = 'medium' AND vote_strength < 0.75)
ORDER BY confidence, vote_strength;
```

## 15. Total invocation cost from ledger via joins

```sql
SELECT i.model_id,
       COUNT(DISTINCT ti.torque_id) AS unique_torques,
       COUNT(*) AS total_joins,
       COALESCE(SUM(i.cost_usd), 0) AS total_cost_usd
FROM torque_invocations ti
JOIN invocations i ON ti.invocation_id = i.id
GROUP BY i.model_id
ORDER BY total_joins DESC;
```
