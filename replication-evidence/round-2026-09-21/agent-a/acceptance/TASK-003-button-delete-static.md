# TASK-003 — `/en/button` static Danger/Delete example parity

Status: `READY_FOR_B`; source captured; no candidate binding; not verified.

## Source behavior to implement

On a fresh `/en/button` session at the **Variants** section, the standalone Danger card contains an enabled `Delete` button (`class="btn btn-danger"`). Clicking that card's `Delete` example produces no visible or DOM state change after 800 ms: it remains enabled, has no `aria-pressed` or `aria-expanded` value, leaves the page height unchanged, and displays no feedback, confirmation, or toast.

This is a documentation/example control. It must not be upgraded into a destructive action or confirmation flow merely because its text says `Delete`. The separate **Delete confirmation** use-case illustration is outside this task's click target.

Fresh source browser evidence is at `../evidence/TASK-003/source/button-delete-source-state.json` and the before/after screenshots in the same directory.

## Candidate binding required from B

`B-ACK` must identify `TASK-003-button-delete-static` and supply immutable revision/hash, changed-file list, exact build command, and served URL. A rejects an unbound or mutable “latest” URL.

## Independent browser acceptance

At `1440×900`, fresh Chromium context, `en-US`, light mode:

1. Open original and the bound candidate `/en/button`; dismiss their survey with skip if present.
2. Scroll the Variants section into view and capture a viewport screenshot before the standalone Danger-card `Delete` click.
3. Record the target's text, disabled state, `aria-pressed`, `aria-expanded`, nearest variant-card text, and document scroll height.
4. Click that exact `Delete` target, wait 800 ms, recapture the viewport and the same state fields.
5. Confirm no toast/dialog/feedback is visible and all recorded state fields are unchanged except inconsequential focus styling.
6. Record browser diagnostics. Compare the fresh candidate viewport with the source baseline and attach the candidate artifacts to an A-written result.

## Pass / fail rule

PASS requires all browser steps, source-to-candidate screenshot comparison, no candidate runtime diagnostics, and the immutable B binding. Any added side effect, disabled/pressed/expanded state, confirmation/toast, missing Danger card, browser error, or absent binding is `NOT_VERIFIED`. Only an A-written PASS result may say `VERIFIED`.
