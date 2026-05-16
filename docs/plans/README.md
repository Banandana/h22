# docs/plans/ — Task Plan Documents

Each plan doc contains the authoritative spec for a group of tasks in STATE.md.
Agents read `STATE.md` first, then open the relevant plan doc for detail.

## Naming convention

Plan files are named `<phase-number>-<slug>.md`:

| File | Phase | Purpose |
|---|---|---|
| `00-bootstrap.md` | 0 | Repo scaffold, config, runner verification |
| `01-knowledge-audit.md` | 1 | Assess QWEN.md completeness, find gaps |
| `02-data-collection.md` | 2 | Fetch missing sources, validate data |
| `03-analysis.md` | 3 | Comparisons, modeling, risk scoring |
| `04-delivery.md` | 4 | Final docs, indexes, quick-references |
| `04b-torque-fastener-index.md` | 4b | Vision-LLM extraction of every fastener + torque from BB6 + OBD1 manuals into two cross-indexed views (by-location, by-fastener). Runs before remaining Phase 4. |

## Per-task sections

Each task gets a `### T-NNN` heading. Sections include:

- **Description** — what needs to be done
- **Depends on** — prerequisite tasks (if any)
- **Spawns** — `[fix]` tasks this audit may create (for `[audit]` tasks only)
- **DoD notes** — any task-specific DoD considerations beyond the global list in STATE.md

## Creating a new plan doc

1. Create the file with the naming convention above.
2. Add a phase header comment at the top.
3. Write `### T-NNN` sections for each task in the phase.
4. Cross-reference task lines in STATE.md to these sections.
5. Update this README with the new file.
