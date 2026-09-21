# TASK-004 — `/en/practice` wrong-answer retry and correct-answer reveal

Status: `READY_FOR_B`; source captured; no candidate binding; not verified.

## Source behavior to implement

In a fresh English Practice session, an incorrect answer remains retryable: the clicked `.practice-option` becomes `is-incorrect` with `aria-pressed="true"`, a red **This judgment misses something** explanation appears, and every option remains enabled. Selecting a correct answer then makes its option `is-correct` with `aria-pressed="true"`, disables all options, shows a green **This judgment fits** explanation, reveals the complete term guide in the right pane, and makes an enabled **Next question** control visible.

Source questions may vary between fresh sessions. The acceptance target is this observable state machine, not any fixed question text or fixed correct option index.

Fresh source evidence includes an observed wrong B → wrong A → correct C path at `../evidence/TASK-004/source/practice-answer-source-state.json`, plus its initial, retry, and correct-state browser screenshots.

## Candidate binding required from B

`B-ACK` must identify `TASK-004-practice-answer-state` and provide B identity, immutable revision/content hash, changed-file list, exact build command, and served URL.

## Independent browser acceptance

At `1440×900`, new Chromium context, `en-US`, light mode:

1. Open original and the immutable candidate `/en/practice`; dismiss the survey with skip if it appears, then capture the initial question panes and option states.
2. In the candidate, choose options one by one until an incorrect state occurs; save a screenshot and DOM state. Do not count an immediately correct option as a failure.
3. Assert after the incorrect state that the selected option is `is-incorrect`, its pressed state is true, a red explanatory block is visible, all options remain enabled, and **Next question** is absent.
4. Select remaining options until the correct state occurs; wait up to 2 seconds for the term guide. Save a screenshot and DOM state.
5. Assert the correct option is `is-correct`, every option is disabled, the green explanatory block and complete term guide are visible, and **Next question** is enabled.
6. Compare initial/retry/correct screenshots with the source layout and record console errors, page errors, failed responses, route, task binding, and browser version.

## Pass / fail rule

PASS requires the complete transition sequence and fresh A-owned browser artifacts. A wrong answer that disables all options, a correct answer that fails to reveal the guide/next action, an invented score/history side effect, runtime diagnostics, missing screenshots, or absent immutable binding is `NOT_VERIFIED`. `VERIFIED` is reserved for an A-written PASS report.
