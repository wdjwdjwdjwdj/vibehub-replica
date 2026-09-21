# Agent A page and interaction inventory

This is an independent working inventory, reconciled with the repository's historical `docs/page-inventory.md` and `docs/interaction-inventory.md`. “Implemented” claims below are historical repository claims, not an A verification of a current B candidate.

| Page family | Representative route | Interaction sample | A evidence state |
| --- | --- | --- | --- |
| Term directory and topics | `/en`, `/en/topics/frontend` | search, topic filtering, favorites, language/theme | historical implementation only |
| Term detail pages | `/en/html` | survey, Quick check, Anatomy, favorite, Markdown copy, next/previous | fresh source baseline for survey; candidate unbound |
| API special detail | `/en/api` | six-step Previous/Next state machine | fresh source baseline; candidate unbound |
| Button special detail | `/en/button` | four static scenes; Danger-card `Delete` sample is a no-side-effect documentation control | `SOURCE_CAPTURED` for TASK-003; candidate unbound |
| Practice | `/en/practice` | incorrect answer retry; correct answer locks options and reveals term guide/Next question | `SOURCE_CAPTURED` for TASK-004; candidate unbound |
| Courses | `/en/courses` | deep link, reader navigation, term side panel | historical implementation only |
| Skill and lab | `/en/vibehub-skill`, `/en/vibehub-skill/lab` | copy feedback and four-step lab | historical implementation only |
| Changelog / AI Slop | `/en/changelog`, `/en/anti-ai-flavor` | filters, anchors, expanded entries | historical implementation only |
| Server-dependent scope | account, cloud favorites, submissions | authentication and remote synchronization | excluded from static parity; no external authority |

## Quality vocabulary

- `SOURCE_CAPTURED`: Agent A operated the official source in Chromium and saved artifacts.
- `READY_FOR_B`: source behavior and independent acceptance procedure are present, but no B candidate is bound.
- `NOT_VERIFIED`: binding or browser evidence is missing, or the candidate failed an acceptance check.
- `VERIFIED`: only after an immutable B binding and A's fresh browser run both exist.
