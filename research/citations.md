# Citation Format & Source Tracking Methodology

> **Task:** T-030 [infra]
> **Date:** 2026-05-15
> **Status:** Complete

---

## Purpose

This document defines the standard citation format and source tracking methodology for all
research files in this project. Every research document must follow these conventions so that
findings are traceable, verifiable, and auditable by a future operator or automated tool.

---

## Citation Format

Every source cited in a research file uses the following structure. Adapt the fields based on
source type (see Source Type Classifications below).

### Standard Citation Entry

```
[Source #] Author/Organization. "Title." *Publication/Website*, Day Month Year. URL.
Retrieved: YYYY-MM-DD HH:MM UTC. Credibility: <score>. Access: <type>.
```

### Field Definitions

| Field | Required | Description |
|-------|----------|-------------|
| Source # | Yes | Number matching the entry in the Sources table of the citing document. |
| Author/Organization | Yes | Individual author name or organization. Use "Anonymous" if unknown. |
| Title | Yes | Full title of the page/article/document. |
| Publication/Website | Yes | Name of the publication, forum, or website. |
| Date | Yes | Publication date in `Day Month Year` format (e.g., `15 Mar 2023`). Use "n.d." if unknown. |
| URL | Yes | Full, absolute URL. No shorteners — resolve them before recording. |
| Retrieved | Yes | When the AI agent fetched this source, in `YYYY-MM-DD HH:MM UTC` format. |
| Credibility | Yes | Score using the credibility scale below. |
| Access | Yes | How the source was accessed: `web_search`, `tavily_extract`, `playwright`, `local_manual`, or `tavily_search`. |

### Example Citations

**Web article:**

```
[1] Honda-Tech Forum Members. "H22A Redtop cam specs and VTEC engagement RPM." *Honda-Tech Forums*, 12 Jun 2019. https://www.honda-tech.com/forums/3rd-gen-prelude-17/h22a-redtop-cam-specs-vtec-engagement-rpm-2345678/. Retrieved: 2026-05-15 14:30 UTC. Credibility: B. Access: tavily_extract.
```

**Official manual:**

```
[2] Honda Motor Co. "1997-2001 Prelude Service Manual." *Helms Manual*, n.d. /data/h22/1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf. Retrieved: 2026-05-14 09:00 UTC. Credibility: A+. Access: local_manual.
```

**Forum post:**

```
[3] "bb6owner." "FRM liner replacement experience on my '98 BB6." *Honda-Tech Forums*, 3 Jan 2021. https://www.honda-tech.com/forums/3rd-gen-prelude-17/frm-liner-replacement-experience-3456789/. Retrieved: 2026-05-15 15:00 UTC. Credibility: C. Access: playwright.
```

---

## Source Type Classifications

Classify each source by its primary type. This affects how you weight the information.

| Type | Description | Examples |
|------|-------------|----------|
| **Primary** | Official factory documentation, OEM service manuals, manufacturer specs | Helms manuals, Honda service bulletins, OEM parts catalogs |
| **Secondary** | Reputable automotive publications, technical articles, verified expert content | TorqueCars, Wikipedia (as summary), enthusiast magazines |
| **Tertiary** | Community forums, blogs, YouTube videos, personal experiences | Honda-Tech, Reddit r/Honda, individual blog posts |
| **Quaternary** | Unverified claims, hearsay, anonymous posts | Unattributed forum comments, social media without verification |

**Rule:** Never state a claim from a Quaternary source as fact. If only quaternary sources
support a claim, mark it as "unverified" and note the lack of corroboration.

---

## Credibility Scoring

Each source receives a credibility score. This score reflects how much trust to place in the
information, not whether the source is "good" or "bad."

### Score Scale

| Score | Meaning | Criteria |
|-------|---------|----------|
| **A+** | Definitive | Factory service manual, OEM specification sheet, official Honda press release |
| **A** | Highly reliable | Reputable technical publication with editorial review, peer-reviewed article |
| **B+** | Reliable | Established enthusiast site with editorial oversight (e.g., TorqueCars), verified expert content |
| **B** | Generally reliable | Well-moderated forum with knowledgeable contributors, detailed technical blog |
| **C+** | Somewhat reliable | Forum post with verifiable details, user-generated content with some corroboration |
| **C** | Low reliability | Anonymous post, single-source claim, no verifiable details |
| **D** | Questionable | Contradicted by higher sources, known unreliable author, clearly speculative |
| **F** | Unreliable | Proven false, trolling, obviously fabricated |

### Credibility Rules

1. **Local manuals** (Helms, factory service manuals) are always **A+**.
2. **OEM part numbers** from Honda catalogs are **A+**.
3. **Single forum posts** are at most **C** unless corroborated by multiple independent sources.
4. **YouTube videos** are at most **C+** — they may contain useful info but lack editability and
   verification.
5. **Wikipedia** is **B+** for general facts (easily verified) but **C+** for technical specs
   (may be outdated or crowd-edited).
6. If a claim appears in sources with different credibility scores, use the highest credible
   source and note lower-scoring contradictions in the Notes section.

---

## Source Tracking Methodology

### Retrieval Timestamps

Every source must record when it was retrieved. This is critical because:
- Web content changes or disappears over time.
- The retrieval timestamp lets a future operator know how fresh the data is.
- It helps identify stale references that should be re-checked.

**Format:** `YYYY-MM-DD HH:MM UTC` (always UTC, always 24-hour clock).

### URL Hygiene

- Resolve all URL shorteners (bit.ly, t.co, etc.) before recording. Store the final destination.
- If a URL returns a 404 or is otherwise inaccessible, record it anyway with a note: `⚠ DEAD`
  next to the URL. Do not discard it — dead links are valuable for knowing what doesn't work.
- Prefer canonical URLs (no tracking parameters like `?utm_source=`). Strip them when possible.

### Cross-Referencing

When multiple sources address the same fact:

1. List all sources in the Sources table, ordered by credibility (highest first).
2. In the Notes section, explicitly call out agreements and disagreements.
3. If sources conflict, state the discrepancy and which version you are using (with justification).

Example:

```
## Notes

- Cam duration figures vary between sources: Helms manual (A+) lists 306° intake / 310° exhaust
  at 0.456mm lift, while Honda-Tech forum members (C) report 308° / 312°. Using the Helms
  figures as authoritative; forum values may reflect measured (not spec) values on a specific engine.
```

### Source Deduplication

If the same content appears in multiple locations (e.g., a TorqueCars article also mirrored on
another site), cite the original/source-of-truth and note the mirror as an alternative access path.

---

## Integration with Research Template

The `research/template.md` file includes two sections that use this citation format:

1. **Sources table** — numbered entries matching the citation format above. Columns: `#`,
   `Source`, `Type`, `URL`, `Retrieved`, `Credibility`.
2. **Citations section** — full citation entries corresponding to each source number.

When creating a new research file:
1. Copy `research/template.md` as your starting point.
2. Replace placeholder fields with actual data.
3. Populate the Sources table with numbered entries.
4. Populate the Citations section with full citation strings.
5. Note any conflicts in the Notes section.

---

## Source Type Codes (Short Form)

For inline references where full citations would be verbose, use these codes:

| Code | Type |
|------|------|
| `P` | Primary (factory manual, OEM spec) |
| `S` | Secondary (technical publication) |
| `T` | Tertiary (forum, blog, video) |
| `Q` | Quaternary (unverified, hearsay) |
| `L` | Local (project's own manual files) |

Example inline citation: `[H22A cam specs: P+A+]`

---

## Quality Checklist

Before marking a research file as "Verified," confirm:

- [ ] Every factual claim has at least one citation.
- [ ] Specifications (dimensions, tolerances, part numbers) have a Primary or A/A+ source.
- [ ] At least 2 independent sources used for every major claim (per DoD item #4).
- [ ] All URLs are absolute and resolved (no shorteners).
- [ ] All retrieval timestamps are present and in correct format.
- [ ] Credibility scores are assigned and consistent with the scoring rules.
- [ ] Conflicts between sources are noted in the Notes section.
- [ ] Dead URLs are marked with `⚠ DEAD` and preserved (not removed).

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-05-15 | 1.0 | Initial creation (T-030). Defines citation format, credibility scale, source tracking methodology. |
