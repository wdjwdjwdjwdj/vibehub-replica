# Agent A checkpoint — 2026-09-21

## State

- Goal: independent coordination and acceptance for the VibeHub replication workstream.
- B identity: not present in live agents, source files, or a round-specific coordination contract discovered at checkpoint time. Live-agent check returned only `/root`.
- Continuous runner: not configured or discoverable.
- Handshake: outbound request `0001-A-HELLO` written; inbound ACK absent.
- Candidate binding: absent. No acceptance verdict has been issued.

## Evidence prepared

- Historical source/local interaction evidence identifies survey submission as a high-value first slice (`round-2026-09-20/html/interactions/interaction-report.json`).
- TASK-001 source capture complete: `agent-a/evidence/TASK-001/source/survey-source-state.json` plus initial/200ms/600ms screenshots. Chromium visual inspection completed for the 200ms screenshot.
- TASK-002 source capture complete: `agent-a/evidence/TASK-002/source/api-flow-source-state.json` plus six step screenshots. Chromium visual inspection completed for step 6.
- TASK-003 source capture complete: `agent-a/evidence/TASK-003/source/button-delete-source-state.json` plus before/after screenshots. Chromium visual inspection confirms that the standalone Danger-card `Delete` sample does not visibly change after click.
- TASK-004 source capture complete: `agent-a/evidence/TASK-004/source/practice-answer-source-state.json` plus initial/retry/correct screenshots. Chromium visual inspection confirms retryable wrong states and correct-answer guide reveal.
- The independent acceptance contract is `agent-a/acceptance/TASK-001-survey-submit.md`.

## Resume sequence

1. Check `coordination/b-to-a/` for a new ACK exactly once per message ID.
2. If no ACK, acceptance is stopped after these two source slices; do not run acceptance against an unbound build.
3. If ACK is complete, record binding in an A report, run the named acceptance browser case, compare fresh screenshots, then send a new A feedback message.
