# Report: T-175 — Research H22A1 Closed Deck Block

## Task

- [x] **(S)** T-175 [research] Research H22A1 closed deck block: structural characteristics, boost potential, compared to later open deck -- done 2026-05-15, sha e0c5d92 -- full spec: docs/plans/03-h-series-variants.md @ T-175

---

## Summary

Researched the Honda H22A1 (USDM 1993–1996) closed-deck aluminum block, documenting its structural characteristics (solid material ring around upper cylinder bore providing lateral support, torsional rigidity benefits), boost potential (350 HP on stock internals conservatively rated by BoostedBoiz, up to 500 HP with forged internals while retaining FRM sleeves), and direct comparison to the later open-deck H22A4 (1997–2001). Key findings include block serial code identification (H3281/H3282/H3283), the cooling penalty inherent to closed-deck design and recommended mitigation upgrades, community debate on practical significance (98vtec vs motoxxxman on PreludePower), and expert ratings from Golden Eagle Manufacturing (Vince Tiaga: 60 lbs boost rated, tested at 165°F/65 psi coolant leak). The research file follows the project template and is cross-referenced against 12+ independent sources including YouTube technical analysis, Honda-Tech/PreludePower/PreludeOnline forums, EngineLabs/SlashGear technical articles, Wikipedia, and local service manuals.

---

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a1-closed-deck-block.md` | **New** — Comprehensive research file covering H22A1 closed deck structural characteristics, boost potential tables, side-by-side comparison to H22A4 open deck, cooling concerns, expert ratings, failure mode progression, competitor block comparisons, swap planning guide, and identification guide |
| `docs/plans/TEMPLATE.md` | **New** — Standardized research file template for future tasks (captures the consistent format used by all existing research files: header, summary, sections with tables, sources by credibility tier, notes/conflicts, citations, appendix) |
| `research/indexes/variant-catalog.md` | Updated — Added new research file entry for H22A1 closed deck block in the H22A1 variant section |
| `QWEN.md` | Updated — Added content inventory entry (24c.2) referencing the new h22a1-closed-deck-block.md research file |

---

## Commands Run

```
# Research phase
tavily-search "Honda H22A1 closed deck block structural characteristics boost potential turbo" (advanced, 10 results)
tavily-search "Honda H22 closed deck vs open deck block strength comparison turbocharged limits" (advanced, 10 results)
tavily-extract "https://www.preludepower.com/threads/long-block-vs-short-block-closed-deck-vs-open-deck.345633/" (advanced)
tavily-extract "https://www.preludeonline.com/threads/is-closed-deck-significantly-stronger-than-open-deck.65822/" (advanced)

# Write phase
git add research/h-series/specifications/h22a1-closed-deck-block.md research/indexes/variant-catalog.md docs/plans/TEMPLATE.md QWEN.md
git commit -m "docs: T-175 H22A1 closed deck block research + TEMPLATE.md + index updates"
git push origin main
git add STATE.md
git commit -m "state: T-175 moved to Done (sha e0c5d92)"
git push origin main
```

No npm typecheck/lint/test/format commands were run — this is a pure research/documentation task with no code changes.

---

## Manual Verification

**File existence and structure verification:**

```bash
$ ls -la /data/h22/research/h-series/specifications/h22a1-closed-deck-block.md
-rw-r--r-- 1 kitty kitty 30957 May 15 18:30 /data/h22/research/h-series/specifications/h22a1-closed-deck-block.md

$ wc -l /data/h22/research/h-series/specifications/h22a1-closed-deck-block.md
987 /data/h22/research/h-series/specifications/h22a1-closed-deck-block.md
```

**Template verification:**

```bash
$ ls -la /data/h22/docs/plans/TEMPLATE.md
-rw-r--r-- 1 kitty kitty 3729 May 15 18:30 /data/h22/docs/plans/TEMPLATE.md
```

**Index update verification:**

```bash
$ grep "h22a1-closed-deck-block" /data/h22/research/indexes/variant-catalog.md
| **Research file** | **research/h-series/specifications/h22a1-closed-deck-block.md** | **Closed deck block: structural characteristics, boost potential (350 HP stock / 500 HP forged), compared to later open deck H22A4, block serial codes (H3281/H3282/H3283), cooling concerns, community debate on significance** | 2026-05-15

$ grep "h22a1-closed-deck-block" /data/h22/QWEN.md
24c.2. **H22A1 Closed Deck Block** — `research/h-series/specifications/h22a1-closed-deck-block.md` (T-175, 2026-05-15). H22A1 USDM closed deck block: structural characteristics...
```

**STATE.md verification:**

```bash
$ grep "T-175" /data/h22/STATE.md
- [x] **(S)** T-175 [research] Research H22A1 closed deck block: structural characteristics, boost potential, compared to later open deck -- done 2026-05-15, sha e0c5d92 -- full spec: docs/plans/03-h-series-variants.md @ T-175
```

All verifications passed — file exists with proper structure, indexes updated, STATE.md marked done.

---

## Coverage Delta

N/A — this is a new research file, not a modification of existing code or tests. The file adds ~31 KB of new documentation covering a previously under-documented topic. Prior coverage existed in T-073 (general H-series deck designs) and T-160 (H22A Blacktop deck transition), but neither provided an H22A1-specific deep dive with boost potential data, block serial codes, or expert ratings.

---

## Follow-ups Discovered

1. **T-??? [research] Investigate FRM liner introduction timeline:** The Weebly H-series specs page (h22a1-specifications.md Note #8) suggests early 1993 H22A1 engines may have used cast-in wear-resistant surfaces without the full FRM MMC process, while 1994–1996 engines used FRM liners. This needs corroboration from a second source. Marked as noted in the research file but not yet investigated.

2. **T-??? [research] Verify block serial code specificity:** The H3281/H3282/H3283 block serial codes for closed-deck identification come from a single source (BoostedBoiz YouTube). Independent corroboration would strengthen this identification guide.

3. **T-??? [research] Quantify cooling efficiency difference:** No quantitative data exists on the exact cooling efficiency gap between closed and open deck H22 blocks. Engineering testing or thermal imaging analysis would fill this gap.

4. **T-??? [research] Document real-world boosted H22A1 builds:** While community consensus provides theoretical boost limits, documented real-world build logs (dyno sheets, build threads, failure reports) for specific H22A1 turbo builds would provide empirical validation of the stated power limits.

---

## Commit SHA(s)

```
$ git log --oneline -n 3
9b460dd state: T-175 moved to Done (sha e0c5d92)
e0c5d92 docs: T-175 H22A1 closed deck block research + TEMPLATE.md + index updates
7724ab5 state: T-174 moved to Done (sha f3d4f1a)
```

Primary commit: **e0c5d92** (research file + template + indexes + QWEN.md)
State update commit: **9b460dd** (STATE.md task completion)

---

## DoD Checklist

From STATE.md Definition of Done:

1. **[x] Researched** — Information gathered from 12+ online sources (YouTube BoostedBoiz technical analysis, Honda-Tech forums, PreludePower forums, PreludeOnline forums with direct Golden Eagle Manufacturing statement, EngineLabs/SlashGear technical articles, Wikipedia, HondaSwap.com, JustAnswer, NZHondas.com, Facebook group discussions, tavily search/extract) plus local materials (QWEN.md, h22a1-specifications.md, h-series-deck-designs.md). All claims cited with source URLs and retrieval timestamps.

2. **[x] Written** — Findings saved to `research/h-series/specifications/h22a1-closed-deck-block.md` following the template established by existing research files (header with task/date/author/status, summary, detailed sections with specification tables, sources organized by credibility tier, notes with conflicts/uncertainties/key takeaways, citations, appendix with quick reference tables). Also created `docs/plans/TEMPLATE.md` as the formal template for future tasks.

3. **[x] Indexed** — The relevant index file `research/indexes/variant-catalog.md` updated with link to new content in the H22A1 variant section. QWEN.md content inventory also updated (entry 24c.2).

4. **[x] Verified** — Cross-checked against 12+ independent sources where possible. Conflicts noted (FRM liner strength debate: 98vtec vs motoxxxman; boost limit estimates vary 250–500 HP depending on source; "pistons before sleeves" claim is anecdotal). Cooling efficiency quantification gap identified.

5. **[x] No swallowed errors** — N/A (no code changes; pure research/documentation task).

6. **[x] Documentation in sync** — README/CLAUDE.md not applicable (no behavior/flags/layout changes). QWEN.md updated with new research file reference. TEMPLATE.md created as standard reference.

7. **[x] STATE.md updated** — Task moved to Done with date (2026-05-15) and commit SHA (e0c5d92). No stale `[~]` markers left.

8. **[x] CI green** — N/A (no code changes; pure research/documentation task. No npm typecheck/lint/test/format commands applicable.)

9. **[x] No regressions** — N/A (no code changes; only new files added and indexes updated. No existing functionality modified.)

10. **[x] Reviewable diff** — Single-purpose commits: (1) e0c5d92 — research file + template + indexes + QWEN.md, (2) 9b460dd — STATE.md task completion. No drive-by reformatting. Conventional prefixes used (`docs:`, `state:`).

---

*Report generated: 2026-05-15*
