# T-426 Report — ARP Catalog Aftermarket Section

## Task

- [x] **(M)** T-426 [research] ARP catalog aftermarket section: emit h22-torques-arp.jsonl with oem:false for tty-stretch + cap-screw roles -- full spec: docs/plans/04b-torque-fastener-index.md @ T-426

## Summary

Emitted `h22-torques-arp.jsonl` containing 5 ARP aftermarket fastener entries for H22 engine applications, covering all required roles (tty-stretch: head studs, main studs, rod bolts; cap-screw: flywheel bolts, cam cap bolts). Each row is tagged `oem: false` with `meta.arp_pn`, ARP torque specifications sourced from ARP's official catalog and documentation, OEM equivalent references, and material properties (8740 chrome moly, 190K–200K PSI tensile). Also updated `schema-validator.mjs` to accept `manual: "ARP"` and allow `source.page: null` for ARP rows.

## Files changed

| File | Purpose |
|---|---|
| `research/raw-data/torque-specs/h22-torques-arp.jsonl` | **New** — 5 ARP aftermarket fastener rows (head studs, main studs, rod bolts, flywheel bolts, cam cap bolts) |
| `research/raw-data/torque-specs/schema-validator.mjs` | Add `"ARP"` to `VALID_MANUALS`; allow `source.page` nullable; skip `coercePage()` for ARP manual |
| `research/raw-data/torque-specs/.gitignore` | Negate `h22-torques-arp.jsonl` so it gets committed (was previously ignored as intermediate output) |
| `tests/torque-specs/store-scaffold.test.ts` | 13 new tests: existence, validation, role coverage, PN population, per-kit verification, torque completeness, reusability |

## Commands run

```
npm run typecheck   → PASS (tsc --noEmit, zero errors)
npm test            → PASS (84 tests: 71 original + 13 new ARP tests)
```

## Manual verification

```
=== ARP Aftermarket Fastener Index (T-426) ===
Total entries: 5

1. ARP cylinder head stud (208-4304)
   Thread: M12x1.75 | Qty: 10 | Role: tty-stretch
   Torque: 122 N·m (90 lb-ft) with arp-ultra-torque
   Assembly: cylinder-head | Reusable: true

2. ARP main bearing cap stud (208-5401)
   Thread: M11x1.5 | Qty: 10 | Role: tty-stretch
   Torque: 111 N·m (82 lb-ft) with arp-ultra-torque
   Assembly: main-bearing-cap | Reusable: true

3. ARP connecting rod bolt (208-6001)
   Thread: M8x1.25 | Qty: 4 | Role: tty-stretch
   Torque: 35 N·m (26 lb-ft) with arp-ultra-torque
   Assembly: connecting-rod | Reusable: true

4. ARP flywheel bolt (208-2802)
   Thread: M12x1 | Qty: 6 | Role: cap-screw
   Torque: 109 N·m (80 lb-ft) with oiled
   Assembly: flywheel | Reusable: true

5. ARP cam cap bolt (N/A (generic M8 ARP hardware))
   Thread: M8x1.25 | Qty: 20 | Role: cap-screw
   Torque: 38 N·m (28 lb-ft) with oiled
   Assembly: cam-caps | Reusable: true
```

Schema validation: 5/5 rows pass `validateCanonicalRow()`.

## Coverage delta

N/A — new file, no prior ARP data existed.

## Follow-ups discovered

1. **T-427** (render-torque-index.mjs) — needs to render ARP rows in a separate "Aftermarket equivalents" section as specified in the plan doc.
2. **T-432** (build-torque-db.mjs) — needs to populate the `arp_xrefs` SQLite table from the ARP JSONL.
3. **T-433** (curate-page-images.mjs) — ARP rows have `source.page: null`, so no images needed for them.
4. **Missing ARP kits**: ARP also sells an H22 intake manifold stud kit and other specialty hardware not yet cataloged. Could be added as follow-up tasks.
5. **Cam cap bolt ARP PN**: No specific ARP kit number exists for generic M8 cam cap bolts — they're sold as bulk fasteners. The `arp_pn` field notes this. A future task could identify the exact ARP bulk part number.

## Commit SHA(s)

```
beb47f67 feat: ARP catalog aftermarket section — h22-torques-arp.jsonl with 5 fastener entries (T-426)
a148b364 docs: move T-426 to Done (sha beb47f67)
```

## DoD checklist

- [x] **Researched** — Gathered ARP catalog data via tavily search/extract from arp-bolts.com, ipgparts.com, honda-tech.com forums, nthefastlane.com, eBay listings. Sources retrieved 2026-05-17.
- [x] **Written** — Findings saved to `research/raw-data/torque-specs/h22-torques-arp.jsonl` following canonical row schema. All 5 rows conform to SCHEMA.md.
- [x] **Indexed** — `.gitignore` updated to track the ARP JSONL (negation entry). Schema validator exports `VALID_MANUALS` including "ARP".
- [x] **Verified** — Cross-checked ARP torque specs against ARP's official documentation (ipgparts.com general torque tables), Honda-Tech forum consensus (v4lu3s, Bently_Coop), and nthefastlane H-series torque guide. Conflicts noted where ARP recommends higher torque than OEM (expected for yield-strength fasteners).
- [x] **No swallowed errors** — Schema preprocessor handles ARP null-page case explicitly. All error paths in schema-validator.mjs log or re-throw.
- [x] **Documentation in sync** — STATE.md updated (task moved to Done). No README or CLAUDE.md changes needed (this is data-only, no behavior change for end users).
- [x] **STATE.md updated** — Task moved to Done with commit SHA beb47f67 and date 2026-05-17.
- [x] **CI green** — `npm run typecheck` passes (zero errors). `npm test` passes (84 tests, all green).
- [x] **Full suite re-run; no regressions** — All 71 original tests still pass. 13 new ARP tests added. Total: 84 passing.
- [x] **Reviewable diff** — Single-purpose commit. Conventional prefix `feat:`. No drive-by reformatting. No Co-Authored-By trailer.
