/**
 * Example pure core module. Replace with your own domain logic, then delete this file,
 * its test and scripts/demo-example.ts.
 *
 * Note the shape: no I/O, and time and randomness are parameters, so tests are deterministic.
 */

/** Returns true once `now` has reached `deadline`. Exactly at the deadline counts as passed. */
export function isPastDeadline(deadline: Date, now: Date): boolean {
  return now.getTime() >= deadline.getTime();
}

/** Returns a shuffled copy of `items` (Fisher-Yates) using the injected `rng` in [0, 1). */
export function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}
