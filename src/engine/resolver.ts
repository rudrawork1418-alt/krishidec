import { Rule } from '../types';

export interface ResolutionResult {
  winner: Rule;
  reason: string;
}

/**
 * Resolves conflicts deterministically when multiple rules match.
 * Precedence order:
 * 1. Specificity: Higher specificity wins.
 * 2. Obligatory: Obligatory (true) wins over optional (false).
 * 3. Declaration Order: Higher / later declaration order wins.
 */
export function resolveConflict(candidates: Rule[]): ResolutionResult | null {
  if (candidates.length === 0) {
    return null;
  }

  if (candidates.length === 1) {
    return {
      winner: candidates[0],
      reason: 'Direct match with no conflicting candidates.',
    };
  }

  // Clone and sort according to strict conflict resolution hierarchy
  const sorted = [...candidates].sort((a, b) => {
    // 1. Specificity (descending)
    if (b.specificity !== a.specificity) {
      return b.specificity - a.specificity;
    }

    // 2. Obligatory (true beats false)
    const bOblig = b.obligatory ? 1 : 0;
    const aOblig = a.obligatory ? 1 : 0;
    if (bOblig !== aOblig) {
      return bOblig - aOblig;
    }

    // 3. Declaration Order (descending)
    return b.order - a.order;
  });

  const winner = sorted[0];
  const runnerUp = sorted[1];

  let reason = '';
  if (winner.specificity > runnerUp.specificity) {
    reason = `Specificity ${winner.specificity} rule overrides the general specificity ${runnerUp.specificity} rule.`;
  } else if (winner.obligatory && !runnerUp.obligatory) {
    reason = `Obligatory rule overrides the optional rule (both have specificity ${winner.specificity}).`;
  } else if (winner.order > runnerUp.order) {
    reason = `Higher declaration order (${winner.order} > ${runnerUp.order}) breaks tie between equal specificity and obligatoriness.`;
  } else {
    reason = 'Deterministic conflict resolution applied based on rule precedence.';
  }

  return {
    winner,
    reason,
  };
}
