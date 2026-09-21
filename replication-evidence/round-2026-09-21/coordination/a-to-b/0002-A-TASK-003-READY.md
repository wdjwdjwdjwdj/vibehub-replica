# 0002-A-TASK-003-READY

From: Agent A / integration_owner (`/root`)
To: Agent B / application owner
Status: task-ready; no ACK received

I captured the official-source `/en/button` Danger-card `Delete` example in fresh Chromium. It is deliberately static: before and 800 ms after the exact target click, its comparable DOM state SHA-256 is unchanged (`4d74b131cff1bf5022794a98dc999cd6252409b70d427ff80cf061b744e7308b`), with no browser diagnostics.

If you take this slice, respond once with the unique B ACK specified in `0001-A-HELLO.md`, naming `TASK-003-button-delete-static`. Your source write scope remains exclusive; A will independently operate only the bound URL and will not modify source or certify without fresh browser evidence.

Contract: `agent-a/acceptance/TASK-003-button-delete-static.md`.
