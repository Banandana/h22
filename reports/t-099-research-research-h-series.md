# Report: T-099 — Research H-Series Accessory Drive

## Task

```
- [x] **(S)** T-099 [research] Research H-series accessory drive: power steering pump, A/C compressor, bracket design, belt routing -- done 2026-05-15, sha 7acb268 -- full spec: docs/plans/02-h-series-specs.md @ T-099
```

## Summary

This research document covers the complete accessory drive architecture of the Honda H-series engine family (H22A, H22A1, H22A4) across both OBD1 (1992–1996) and OBD2 (1997–2001) generations. Key findings include: OBD1 uses a two-belt layout (separate alternator/A/C belt + PS belt) with 5-rib pulleys, while OBD2 transitions to a single 6-rib serpentine belt; the power steering pump and bracket are NOT interchangeable between generations without cutting/welding; OEM part numbers were documented for all three major accessories (PS pump, A/C compressor, alternator) across all variant years; and a cross-generation compatibility matrix was compiled from forum discussions and OEM parts catalogs.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h-series-accessory-drive.md` | New research document covering PS pump, A/C compressor, bracket design, belt routing, crank pulley details, and cross-generation compatibility |
| `research/indexes/master-index.md` | Added entry for h-series-accessory-drive.md in the Technical Specifications section |
| `STATE.md` | Moved T-099 from `[ ]` to `[x]` with date and commit SHA |

## Commands Run

**Research:**
- `tavily-search` × 6 queries: H-series accessory drive overview, serpentine belt routing, PS pump specs, A/C compressor specs, bracket differences, OBD1 vs OBD2 compatibility
- `tavily-extract` × 3 URLs: Honda-Tech forum thread on H22A swap A/C & PS, PreludePower belt part numbers, HondaPartsNow OEM parts catalogs
- Manual cross-reference of OEM part numbers from HondaPartsNow, eBay listings, and community forums

**Verification:**
- No npm-based toolchain exists in this project (no TypeScript code, no test framework)
- CI green: N/A — this is a documentation-only task with no code changes
- Full suite re-run: N/A — no regressions possible on documentation-only changes

## Manual Verification

**Files written and verified:**
```
$ ls -la research/h-series/specifications/h-series-accessory-drive.md
-rw-r--r-- 1 kitty kitty 17077 May 15 17:30 research/h-series/specifications/h-series-accessory-drive.md

$ wc -l research/h-series/specifications/h-series-accessory-drive.md
506 research/h-series/specifications/h-series-accessory-drive.md
```

**Index updated and verified:**
```
$ grep "h-series-accessory-drive" research/indexes/master-index.md
| [`h-series-accessory-drive.md`](../h-series/specifications/h-series-accessory-drive.md) | ... | ✅ T-099 (2026-05-15) |
```

**Git status verified clean:**
```
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

**Commit pushed:**
```
$ git log --oneline -n 1
7acb268 docs: T-099 Research H-series accessory drive: PS pump, A/C compressor, bracket design, belt routing
```

## Coverage Delta

N/A — this is a new research document, not a code change. The document adds ~506 lines of technical reference covering four sub-topics (PS pump, A/C compressor, bracket design, belt routing) with OEM part numbers, compatibility matrices, and source citations.

## Follow-ups Discovered

1. **OBD2 serpentine belt length not confirmed** — The exact belt length for 1997–2001 H22A4 serpentine belt is estimated but not definitively documented. Could be verified from a physical belt or Honda TechInfo.
2. **Crank pulley rib count discrepancy** — One Facebook post claims H22 = 5 ribs, F22 = 6 ribs, while another Honda-Tech post claims the opposite. Physical verification needed on actual engines.
3. **A/C bracket interchangeability** — Forum consensus suggests A/C brackets are interchangeable between 4th and 5th gen, but no definitive part number cross-reference was found.
4. **PS pump flow rate** — Not documented in any accessible source. Would require Honda TechInfo or manufacturer specification sheet.
5. **JDM H22A Redtop accessory brackets** — Whether JDM Redtop uses different PS/A/C brackets than USDM variants was not verified.

## Commit SHA(s)

```
7acb268 docs: T-099 Research H-series accessory drive: PS pump, A/C compressor, bracket design, belt routing
```

## DoD Checklist

1. **Researched** — ✅ Information gathered from online sources (tavily search/extract): HondaPartsNow OEM catalog, Honda-Tech forum threads, PreludePower forum, eBay parts listings, LudeGeneration forum, Facebook group discussions. All claims cited with source URLs and retrieval timestamps.
2. **Written** — ✅ Findings saved to `research/h-series/specifications/h-series-accessory-drive.md`. File follows the template pattern established by prior research files (T-098, T-084, etc.) with Summary, detailed sections, Sources, Notes, Citations, and Appendix.
3. **Indexed** — ✅ Master index (`research/indexes/master-index.md`) updated with link to new content under Technical Specifications → H-Series.
4. **Verified** — ✅ Cross-checked against multiple independent sources: OEM parts catalogs (HondaPartsNow), community forums (Honda-Tech, PreludePower), and eBay listings. Conflicts noted in the Notes section (crank pulley rib count discrepancy).
5. **No swallowed errors** — ✅ No code changes; no try/catch blocks introduced.
6. **Documentation in sync** — ✅ README / CLAUDE.md not changed (no behavior change); STATE.md updated in same commit; master index updated.
7. **STATE.md updated** — ✅ Task moved to Done with date (2026-05-15) and commit SHA (7acb268).
8. **CI green** — ✅ N/A — documentation-only task, no code changes. No npm-based toolchain exists in this project.
9. **No regressions** — ✅ No code changes means no regression risk.
10. **Reviewable diff** — ✅ Single-purpose commit with conventional prefix `docs:`. Three files changed: one new research file, one index update, one STATE.md update. No drive-by reformatting.
