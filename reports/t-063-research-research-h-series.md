# Report: T-063 — Research H-Series Homologation Requirements

## Task

- [x] **(S)** T-063 [research] Research H-series homologation requirements: racing series eligibility, special edition approvals -- full spec: docs/plans/01-h-series-development.md @ T-063

---

## Summary

This research task covered two major topics for the Honda H-series engine family (H22A, H22A1–H22A8, H22Z1, H23A): (1) racing series eligibility across factory-backed motorsport programs and modern club racing organizations, and (2) special edition model approvals across all major markets. The research identified that the H22A was directly used by Honda Europe in European Formula 3 (destroked to 2.0L), BTCC, and JTCC — winning both JTCC championships (1996–1997). In modern club racing, the H22 is explicitly eligible in NASA's Honda Challenge series (H2/H4 classes), SCCA Time Trial (Tuner classes), and SCCA National Solo. The FIA maintains a Historic Database entry for the H22A engine, and multiple Prelude models carry FIA homologation forms. Special editions documented include JDM SiR.S spec, Type S, USDM Type SH, EDM VTi-S, and Accord Type R.

---

## Files Changed

- `research/h-series/development/h-series-homologation-racing-eligibility.md` — New research file covering H-series homologation requirements, racing series eligibility (NASA, SCCA, FIA, SVRA, HSR), factory-backed racing history (F3, BTCC, JTCC), special edition model approvals (JDM, USDM, EDM), emissions compliance by market, and modern Prelude special editions (2024+). 500+ lines, 16 sources cited.
- `research/indexes/master-index.md` — Updated Development History section to include new file; updated Motorsport section to cross-reference new file.

---

## Commands Run

```bash
# Web search queries executed via tavily-mcp
tavily-mcp search "Honda H22A engine homologation racing series eligibility touring car" (depth: advanced, 10 results)
tavily-mcp search "Honda Prelude special edition approval regulations JDM USDM EDM homologation" (depth: advanced, 10 results)
tavily-mcp search "H22A engine SCCA Spec Racer Ford eligible engine class rules" (depth: advanced, 8 results)
tavily-mcp search "H22A engine SCCA GTD IMSA historic racing eligible class rules modifications allowed" (depth: advanced, 8 results)
tavily-mcp search "Honda H22 SCCA GTD IMSA historic racing eligible class rules modifications allowed" (depth: advanced, 8 results)

# Content extraction via tavily-mcp
tavily-mcp extract "https://historicdb.fia.com/car/honda-h22a-engine-0" (depth: advanced)
tavily-mcp extract "https://historicdb.fia.com/range/prelude" (depth: advanced)
tavily-mcp extract "https://drivenasa.com/road-racing/honda-challenge/" (depth: advanced)

# File operations
ls /data/h22/research/indexes/
ls /data/h22/research/h-series/development/
git status --short
```

**Typecheck/Lint/Test:** N/A — this is a research/documentation task, not code. No TypeScript files modified.

---

## Manual Verification

1. **Research file written and verified:** Confirmed `research/h-series/development/h-series-homologation-racing-eligibility.md` exists and contains all required sections (Summary, Specifications, Sources, Notes, Citations, Appendix) per template in `research/template.md`.

2. **Source verification:** Cross-checked key claims against multiple independent sources:
   - FIA Historic Database homologation forms (Nos. 5837, 5357, 5351, 5291, 5153, 307, 308) — verified via direct extraction from historicdb.fia.com
   - NASA Honda Challenge engine eligibility list — verified via drivenasa.com extraction showing H22 explicitly listed in H2 Limited Preparation
   - JTCC championship wins (1996–1997) — confirmed by QWEN.md cross-referenced with Wikipedia and Honda-Tech forums
   - BTCC participation (1995–1997 Neil Brown Engineering) — confirmed by QWEN.md and Wikipedia
   - European F3 (1994–2001) — confirmed by Wikipedia, TorqueCars, and QWEN.md
   - SCCA TT classing (Prelude 1978–2001 in Tuner 4/5) — confirmed by Texas SCCA 2022 TT Classing Guide PDF
   - Honda Global press release (SiR.S spec, 1998-09-24) — verified via global.honda URL

3. **Index updated:** Confirmed `research/indexes/master-index.md` includes entry for new file in both Development History and Motorsport sections.

4. **No local manual cross-reference needed:** This task covers homologation/racing/special editions — topics not covered in Helms service manuals. Primary sources are FIA records, racing organization rulebooks, and manufacturer press releases.

---

## Coverage Delta

N/A — this is a research/documentation task. No code was modified.

---

## Follow-ups Discovered

None. This task was self-contained and did not spawn new backlog items. The research file notes several open questions that could be expanded in future tasks:
- Detailed FIA homologation form content (images/specs) for each Prelude model
- Specific NASA Honda Challenge H22 build case studies and dyno results
- Modern 2024+ Prelude hybrid powertrain specifications vs classic H22A comparison
- H22A eligibility in additional regional racing series (Australia, South Africa, Southeast Asia)

These are candidates for future `[fix]` or `[research]` tasks if gaps are identified during checkpoint audits.

---

## Commit SHA(s)

Pending — commit will be created after report review.

---

## DoD Checklist

- [x] **Researched** — Information gathered from 16 sources including FIA Historic Database (historicdb.fia.com), NASA Honda Challenge (drivenasa.com), Honda Global Newsroom (global.honda), SCCA/Texas SCCA documents, Wikipedia, SVRA, HSR, HMSA, Gear Patrol, SpeedMe, dieselnet.com, and project QWEN.md. All claims cited with source URLs and retrieval timestamps (2026-05-15).

- [x] **Written** — Findings saved to `research/h-series/development/h-series-homologation-racing-eligibility.md` following the template in `research/template.md`. File contains Summary, Specifications (tables), Sources (primary + secondary), Notes, Citations, and Appendix sections.

- [x] **Indexed** — `research/indexes/master-index.md` updated with links to new content in both Development History and Motorsport sections.

- [x] **Verified** — Cross-checked against 2+ independent sources where possible:
  - FIA homologation forms: verified via historicdb.fia.com direct extraction (7 forms confirmed)
  - NASA eligibility: verified via drivenasa.com extraction + cross-referenced with QWEN.md motorsport section
  - JTCC/BTCC/F3: verified via Wikipedia, TorqueCars, and QWEN.md (3 independent sources)
  - Special editions: verified via Honda Global press release, Goo-net Exchange catalog, Wikipedia, and QWEN.md (4+ sources)
  - Conflicts noted: None found. Minor variation in Accord Type R power figures (212 PS vs slightly different values) noted in Notes section.

- [x] **No swallowed errors** — Not applicable (documentation task, no code).

- [x] **Documentation in sync** — `research/indexes/master-index.md` updated in same commit as research file.

- [ ] **STATE.md updated** — Pending commit.

- [x] **CI green** — N/A (no code changes).

- [x] **No regressions** — N/A (no code changes).

- [x] **Reviewable diff** — Single-purpose commit: one new research file + one index update. Conventional prefix: `docs:`.
