# claude-scaffolding

A starter repo for building an app with **Claude Code**, with the practices that worked on a real
project built up front: one milestone per session, tests run after every turn by a hook, a lint-enforced
pure core, coverage thresholds, quiet output to save tokens, and a growing "Mistakes to Avoid" list.

The default stack is TypeScript + Node + Jest + ESLint + Prettier. Swap it out freely; the workflow
files (`AGENTS.md`, `.claude/`, `plans/`) are stack-agnostic.

## Start a new project from this

1. On GitHub, click **Use this template** (or clone and re-init git). Create a `dev` branch.
2. `npm install && npm run tests` (an example module and test ship so everything is green).
3. Fill in `doc/REQUIREMENTS.md` in your own words. Rough is fine.
4. Replace `<project name>` in `AGENTS.md`, `name` in `package.json`.
5. Open Claude Code and say: _"Read doc/REQUIREMENTS.md and draft ARCHITECTURE.md, plans/ROADMAP.md
   and the first milestone (M0) in plans/active/. Ask me about anything unclear."_
6. Approve the plan, **start a new session**, and say _"execute the active milestone"_.
7. Repeat: draft → approve → new session → execute → done. Delete `src/core/example.ts`,
   its test and `scripts/demo-example.ts` once you have real code.

## What's here and why

See [`doc/CLAUDE-CODE-PRACTICES.md`](doc/CLAUDE-CODE-PRACTICES.md) for the reasoning behind each piece.

| File                                  | Role                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------ |
| `CLAUDE.md` → `AGENTS.md`             | Standing rules loaded every session (one source, works for other agents) |
| `.claude/settings.json`               | Allowed commands (fewer prompts), denied reads of `.env`, Stop hook      |
| `.claude/hooks/run-tests.sh`          | Runs tests after each turn; on failure shows 30 lines and blocks "done"  |
| `.claude/skills/draft-milestone/`     | How to write the next plan                                               |
| `.claude/skills/finish-milestone/`    | The Definition of Done checklist                                         |
| `plans/`                              | Roadmap, milestone template, `active/` and `archive/`                    |
| `eslint.config.mjs`, `jest.config.js` | Purity rules for `src/core/`; 100%/90% coverage thresholds               |

## Commands

```bash
npm run tests          # quiet, coverage summary only
npm run typecheck
npm run lint
npm run -s demo:example
```
