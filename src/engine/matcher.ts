import { Rule, RulePattern, StateVector } from '../types';

/**
 * Checks whether a rule pattern matches the current state vector.
 * A pattern element of '*' matches any binary value (0 or 1).
 * Otherwise, the element must exactly equal the state bit.
 */
export function matches(pattern: RulePattern, state: StateVector): boolean {
  for (let i = 0; i < 4; i++) {
    if (pattern[i] !== '*' && pattern[i] !== state[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Finds all rules in the rule base that match the given state vector.
 */
export function findCandidates(rules: Rule[], state: StateVector): Rule[] {
  return rules.filter((rule) => matches(rule.pattern, state));
}
