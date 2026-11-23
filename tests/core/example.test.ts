import { isPastDeadline, shuffle } from '../../src/core/example';

describe('isPastDeadline', () => {
  const deadline = new Date('2026-01-05T13:00:00.000Z');

  it('is false one millisecond before the deadline', () => {
    expect(isPastDeadline(deadline, new Date(deadline.getTime() - 1))).toBe(false);
  });

  it('is true exactly at the deadline', () => {
    expect(isPastDeadline(deadline, new Date(deadline.getTime()))).toBe(true);
  });
});

describe('shuffle', () => {
  it('is deterministic for a given rng and does not mutate the input', () => {
    const input = [1, 2, 3, 4];
    const rng = () => 0;
    expect(shuffle(input, rng)).toEqual([2, 3, 4, 1]);
    expect(input).toEqual([1, 2, 3, 4]);
  });

  it('handles empty and single-item lists', () => {
    expect(shuffle([], Math.random)).toEqual([]);
    expect(shuffle(['a'], Math.random)).toEqual(['a']);
  });
});
