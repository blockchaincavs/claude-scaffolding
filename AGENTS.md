# Standing Rules: <project name>

<!-- Keep this file short: it is loaded into every Claude Code session (via CLAUDE.md -> @AGENTS.md).
     Every line costs tokens on every turn. Put detail in ARCHITECTURE.md / plans and link to it. -->

## Environment & Commands

- Tests: `npm run tests` (quiet, coverage summary only). Also `npm run typecheck`, `npm run lint`.
- Run scripts quietly without progress bars or verbose warnings (`npm ... --silent`, `-s`).
- Work on branch `dev`; merge into `main` only when a milestone is done and the user asks.
- Tests go in `tests/`, mirroring `src/` (never next to the source).
- Manual checks: `npm run -s demo:<name>` (offline from `data/` by default; add `--live` for real APIs).
- In a Claude Code cloud session, Node's `fetch` needs
  `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt`. When the proxy injects an API
  key, set the key env var to a dummy value (e.g. `EXAMPLE_API_KEY=proxy-injected`).
- Requirements: `doc/REQUIREMENTS.md`. Roadmap: `plans/ROADMAP.md`.

## Architecture & Workflow

- Refer to `ARCHITECTURE.md` for module boundaries and file placement.
- Execute only the active milestone in `plans/active/` when instructed, then stop.
- Ask the user directly (a question prompt) for approvals, choices and edits. Never put a "needs from
  you" or to-do-for-the-user section in milestone files; record the decision there once made.
- Milestone flow: draft the plan in `plans/active/` (skill: `draft-milestone`) → the user approves it →
  **tell the user to start a new session** (fresh context) and say "execute the active milestone"
  there. Don't execute a plan in the session that drafted it. Close out with `finish-milestone`.
- Keep `src/core/` pure: no network, file I/O, `process`, clock or randomness (enforced by ESLint).
  Time (`now`) and randomness (`rng`) are passed in as arguments.
- I/O lives in `src/adapters/`, behind interfaces, so tests can use in-memory fakes and fixtures.
- Secrets live only in `.env` (gitignored) and server environment variables. Never in client code
  or public (`NEXT_PUBLIC_*`, `VITE_*`) vars.
- Update `doc/diagrams/*.drawio` when module boundaries or data flow change.

## Definition of Done (every milestone)

1. The milestone file lists edge cases up front; each one has a test.
2. `npm run tests`, `npm run typecheck`, `npm run lint` all pass. Coverage thresholds
   (100% `src/core/`, 90% elsewhere) are enforced by `jest.config.js`. Never lower them to pass.
3. Move the milestone file from `plans/active/` to `plans/archive/`, tick it in `plans/ROADMAP.md`.
4. The milestone has a manual check you can run: a `npm run -s demo:<name>` script or, once there
   is a UI, a page in the running app. The milestone file says how to run it.
5. Update `doc/diagrams/architecture.drawio` for any new module, service or data flow.
6. Add any new lesson to "Mistakes to Avoid". Commit on `dev`, push, then stop.

- A Stop hook (`.claude/hooks/run-tests.sh`) runs the tests after each turn; full log in `logs/tests.log`.

## Token-Saving & Output Rules

- **NEVER** print raw JSON, full CSV rows, or >30 lines of logs to stdout. Write logs to `logs/`
  and read only the relevant part (`tail`, `grep`).
- Never re-download contents in `data/` unless explicitly asked.

## Mistakes to Avoid

<!-- One line per lesson. Add to this list at the end of every milestone. These came from earlier projects. -->

- After changing ignore rules, run `git rm --cached <file>` for files already tracked (a misspelled
  `.gitignore` once let `.env` get committed).
- Push work to `dev`, never straight to `main`.
- Never point tests or scripts at a production project or database. Use Dev; scripts refuse to run
  unless `APP_ENV=dev`.
- A fresh session's `dev` checkout can be stale. Run `git fetch origin dev` and fast-forward before
  reading `plans/active/`.
- Time-zone code must not depend on the host TZ: run calendar tests with `TZ=Asia/Tokyo` too. Use
  IANA zones (DST-aware), never fixed UTC offsets.
- Check real API data, not just the docs, before trusting a value list (enums often have extra values).
- MCP/console plugins sign in as the user; code can't use them. Scripts and tests need their own
  API key (in `.env`, or injected by the cloud proxy).
