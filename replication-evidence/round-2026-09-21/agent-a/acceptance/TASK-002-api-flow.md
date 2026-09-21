# TASK-002 — `/en/api` six-step flow parity

Status: SOURCE_CAPTURED; no candidate binding; not verified.

## Acceptance target

In a fresh `/en/api` page after dismissing the survey, the API flow begins at `1 / 6`. Previous is disabled on the first state. Repeated Next advances one state at a time to `6 / 6`, then Next is disabled. The ordered state labels/classes and flow-panel screenshots at first, middle, and last state must match the fresh A source capture.

## Independent test procedure

At `1440×900` Chromium with a new context:

1. Open source and bound candidate; dismiss their survey using skip, not an option submission.
2. Save first-state panel screenshot and state data: counter, scene identifier/classes, Previous/Next disabled flags.
3. Click Next twice and save the middle state.
4. Click Next three more times and save final-state data and screenshot.
5. Reject missing `1→…→6` progression, wrong boundary disabled states, browser errors, or a lack of binding.

This contract deliberately excludes animation-timing exactness until a source animation profile is captured.
