# Round 2026-09-21 — Agent A coordination record

## Authority and write scopes

| Role | Identity | Write scope | Status |
| --- | --- | --- | --- |
| Agent A / integration_owner | Codex `/root` | `replication-evidence/round-2026-09-21/agent-a/**` and `coordination/a-to-b/**` | active |
| Agent B / application owner | unassigned / not discoverable in the workspace | application source only, plus `coordination/b-to-a/**` | unavailable |

Agent A must not modify `src/**`, `public/**`, `tests/**`, Vite configuration, or a candidate build. Agent A does not merge or certify an unreviewed version.

## Shared protocol path

The round's shared, append-only message protocol is:

- A → B: `replication-evidence/round-2026-09-21/coordination/a-to-b/`
- B → A: `replication-evidence/round-2026-09-21/coordination/b-to-a/`

Each message uses a unique, increasing `NNNN-ROLE-TYPE.md` filename. Never edit an existing message; a correction is a new message that references the previous ID.

## Binding and acceptance gate

Before an acceptance run, B must send an ACK containing all of: identity, source revision or immutable content hash, exact build command, served URL, changed files, and the requested task ID. A then runs the task's browser test and fresh screenshot comparison against the source evidence. Only an A-written result with those inputs and browser artifacts may use `VERIFIED`; build output or B self-report alone cannot.

## Recovered historical context (not a current candidate)

- T2 historical contract: `replication-evidence/vibehub-independent-editable/vibehub-independent-editable-editable/T2-IMPLEMENTATION-CONTRACT.json`.
- Its 2026-09-17 verification says `machinePassed: false`, `visualEvidencePassed: false`, and `visualAcceptancePassed: pending`; it is not a verified baseline.
- Current repository `HEAD` is `57609e47542fee27bc94c7221002bac88126e31b`, but the worktree is dirty and no B-owned candidate binding was supplied. It is therefore **not an acceptance candidate**.

## Stop / resume rule

Stop acceptance if no B ACK or no immutable binding exists. Continue source research and prepare the next independent test. Resume from `checkpoint.md` when B sends an ACK.
