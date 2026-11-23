/**
 * Manual check: `npm run -s demo:example [-- --now=<ISO time>]`.
 * Prints a short summary (never raw JSON or long logs). The clock is read here, not in src/core/.
 */
import { isPastDeadline, shuffle } from '../src/core/example';

const arg = process.argv.find((a) => a.startsWith('--now='));
const now = arg ? new Date(arg.slice('--now='.length)) : new Date();
const deadline = new Date('2026-01-05T13:00:00.000Z');

console.log(`now:       ${now.toISOString()}`);
console.log(`deadline:  ${deadline.toISOString()}`);
console.log(`past it?   ${isPastDeadline(deadline, now) ? 'yes' : 'no'}`);
console.log(`shuffled:  ${shuffle(['a', 'b', 'c', 'd'], Math.random).join(' ')}`);
