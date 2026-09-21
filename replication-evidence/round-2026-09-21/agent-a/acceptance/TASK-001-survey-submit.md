# TASK-001 — `/en/html` survey option submission parity

Status: READY_FOR_B; no candidate binding; not verified.

## Source behavior to implement

On a fresh, first-visit `/en/html` session, click survey option index 2 (`Xiaohongshu`). The source keeps the survey mounted while it submits: options are disabled and `.source-survey-options` has `aria-busy="true"`; the panel closes after the request settles. The close/skip control is a separate path.

The 2026-09-20 historical interaction report observed a mismatch: the local implementation closed synchronously on option click. That report is context only; current source evidence for this task must be the fresh A capture in this round.

## Candidate binding required from B

`B-ACK` must identify this task and give revision/hash, build command, served URL, and changed files. A rejects unbound URLs and mutable “latest” claims.

## Independent browser acceptance

At viewport `1440×900`, fresh Chromium context, `en-US`, light mode:

1. Navigate to the original and candidate `/en/html`; wait for their surveys to become visible.
2. Capture initial panel screenshots and DOM state.
3. Click option index 2 in each; capture at about 200 ms and 600 ms.
4. Record whether options become disabled, whether `aria-busy` becomes `true`, and whether the panel remains visible during submission.
5. Capture final state at about 1.8 s; record close state, page errors, console errors, and failed responses.
6. Compare cropped panel screenshots and documented state transitions. Tolerate timing jitter only when the ordered state transition matches.

## Pass / fail rule

PASS requires all six browser checks and fresh artifacts. A result is `VERIFIED` only after PASS plus the B binding appears in the report. Any synchronous candidate close, missing busy/disabled state, browser error, or absent binding is `NOT_VERIFIED` with reproducible diagnostics.
