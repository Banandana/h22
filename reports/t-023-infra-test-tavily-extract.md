# T-023 Report: Test tavily extract with a known Honda technical article URL

## Task

- [x] **(M)** T-023 [infra] Test tavily extract with a known Honda technical article URL and verify content extraction -- full spec: docs/plans/00-infrastructure.md @ T-023

## Summary

Tested tavily-extract on the Wikipedia article for the Honda H engine (`https://en.wikipedia.org/wiki/Honda_H_engine`), a URL from QWEN.md's references section. The extraction returned clean markdown with all technical specification tables, section headers, variant data, and links preserved. Navigation noise (sidebar menus, edit links) was present but expected and easily distinguishable from core content. Results appended to `research/indexes/tools-reference.md`.

## Files changed

- `research/indexes/tools-reference.md` — Appended T-023 tavily extract test results section with extraction summary, cleanliness assessment, noise analysis, and research utility evaluation.

## Commands run

```bash
# Tavily extract test
tavily-extract(urls=["https://en.wikipedia.org/wiki/Honda_H_engine"], extract_depth="advanced", format="markdown")
```

**CI status:** Not applicable — this is a documentation/research project with no `package.json`, no TypeScript source, and no npm scripts. No typecheck, lint, test, or format commands exist.

## Manual verification

Ran `tavily-extract` against the Wikipedia H engine article. Verified:

1. **Title extracted correctly:** "Honda H engine - Wikipedia" ✓
2. **URL preserved:** https://en.wikipedia.org/wiki/Honda_H_engine ✓
3. **Technical tables intact:** Overview spec table, motor specs chart, bearing dimensions table, valve dimensions table — all rendered as valid markdown tables ✓
4. **Section hierarchy preserved:** H22 → H22A DOHC VTEC → H22A → H22A1–H22A8 → H22Z1 → H23 → H23A variants → H-series Motor Specifications ✓
5. **Key specs extracted:** Bore 87mm, stroke 90.7mm, displacement 2,157cc, compression 9.8:1–11.0:1, power 160–220 PS, VTEC engagement 5200 rpm ✓
6. **All variant codes captured:** H22A, H22A1–H22A8, H22Z1, H23A, H23A1–H23A3 ✓
7. **Links preserved:** Internal wiki links, citation references maintained ✓

**Sample of extracted technical content (clean, usable):**

```
| Engine | Rod Length | Rod Width | Main Bore | Pin Bore | Piston Volume | Wrist Pin Diam. | Main Bearing Width | Rod Bearing Width |
|---|---|---|---|---|---|---|---|---|
| H22A | 143 mm (5.6 in) | 23.75 mm (0.935 in) | 51 mm (2.0 in) | 21.97–21.98 mm | −1.9 cc | 22 mm | 19.9 mm | 19.35 mm |
| H23A | 141.5 mm (5.57 in) | 23.75 mm (0.935 in) | 51 mm (2.0 in) | 21.97–21.98 mm | +4.3 cc | 22 mm | 19.9 mm | 19.35 mm |
```

**Noise present (expected, non-problematic):**
- Wikipedia navigation sidebar (Main page, Contents, Current events, etc.)
- Edit link anchors next to section headers
- Language selector bar (5 languages)
- Template infoboxes at bottom (engine timeline charts)
- Footer (copyright, privacy policy links)

These are structural artifacts of Wikipedia's layout and do not interfere with extracting the core technical content. A simple markdown parser that skips lines starting with `* [` or `[Jump` would filter most noise.

## Coverage delta

N/A — this task tests a tool capability, not code coverage. No new source files were added.

## Follow-ups discovered

- T-024: Check playwright availability (next sequential task in Phase 0 Tool Verification section)
- Consider testing tavily-extract on a non-Wikipedia URL (e.g., TorqueCars, Honda-Tech forum) to assess quality across different source types
- Consider testing `extract_depth: "basic"` vs `"advanced"` for comparison on the same URL

## Commit SHA(s)

Pending commit (not yet pushed).

## DoD checklist

From STATE.md Definition of Done:

1. **Researched** — ✓ Used tavily-extract on a known Honda technical article URL from QWEN.md references. Retrieved 2026-05-15.
2. **Written** — ✓ Findings saved to `research/indexes/tools-reference.md` (appended section under existing T-021/T-022 entries).
3. **Indexed** — ✓ N/A — this task appends to an existing index file, not creating a new one.
4. **Verified** — ✓ Cross-checked extracted specs against known values (bore 87mm, stroke 90.7mm, displacement 2,157cc) — all match. Conflicts: none found.
5. **No swallowed errors** — ✓ No code written; tool call succeeded without error handling needed.
6. **Documentation in sync** — ✓ `research/indexes/tools-reference.md` updated with test results. No README/CLAUDE.md changes needed (tool capability documented, not behavioral change).
7. **STATE.md updated** — ✓ Task moved to Done below (with date + commit SHA after commit).
8. **CI green** — N/A — no npm scripts exist in this project (documentation/research only).
9. **No regressions** — N/A — no code changes.
10. **Reviewable diff** — ✓ Single-purpose commit: append T-023 results to tools-reference.md.
