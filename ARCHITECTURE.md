# Architecture

<!-- One paragraph: what the app is and who uses it. Claude reads this before placing any file. -->

Diagram: [`doc/diagrams/architecture.drawio`](doc/diagrams/architecture.drawio) (open in draw.io).

## Layout

| Path            | Purpose                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `src/core/`     | Pure domain logic. No I/O; time and RNG are passed in. 100% test coverage. Lint-enforced.        |
| `src/adapters/` | Everything that talks to the outside world (HTTP APIs, database, files), behind interfaces.      |
| `tests/`        | Jest tests, mirroring `src/` (e.g. `tests/core/example.test.ts`). No tests inside `src/`.        |
| `scripts/`      | Manual demo scripts (`npm run -s demo:*`) that run a milestone's code and print a short summary. |
| `data/`         | Recorded API fixtures for tests and offline demos. Never re-downloaded unless asked.             |
| `doc/`          | Requirements and draw.io diagrams.                                                               |
| `plans/`        | `ROADMAP.md`, `TEMPLATE-milestone.md`, `active/` (current milestone), `archive/` (done).         |
| `.claude/`      | Shared Claude Code settings: permissions, the Stop hook that runs tests, project skills.         |

## Key design rules

- **Ports and adapters.** Entry points depend on interfaces; tests use in-memory fakes and fixtures
  from `data/`. Entry points are thin: load, apply core logic, save.
- **Deterministic core.** Time (`now`) and randomness (`rng`) are arguments.
- **The server is the source of truth.** Anything a client sends is untrusted and re-checked.
- **Secrets** exist only in server environment variables and the local `.env`.
- **Separate Dev and Prod** environments; tests and scripts touch Dev only.
