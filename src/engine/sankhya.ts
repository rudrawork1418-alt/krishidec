import { FarmConditions, StateVector } from '../types';

/**
 * Encodes four farm condition selections into a 4-bit State Vector.
 * Vector order: [Soil, Monsoon, Season, Pest]
 */
export function encode(conditions: FarmConditions): StateVector {
  return [conditions.soil, conditions.monsoon, conditions.season, conditions.pest];
}

/**
 * Calculates the decimal Sankhya representation from the state vector.
 * Iterative rule: value = value * 2 + bit
 * For [1, 0, 1, 0]:
 * 0*2 + 1 = 1
 * 1*2 + 0 = 2
 * 2*2 + 1 = 5
 * 5*2 + 0 = 10
 */
export function sankhya(state: StateVector): number {
  let value = 0;
  for (const bit of state) {
    value = value * 2 + bit;
  }
  return value;
}
