import {
  FarmConditions,
  StateVector,
  Rule,
  DecisionResult,
  TraceStep,
} from '../types';
import { encode, sankhya } from './sankhya';
import { findCandidates, matches } from './matcher';
import { resolveConflict } from './resolver';

// Re-export core functions for external accessibility
export { encode, sankhya, matches, findCandidates, resolveConflict };

/**
 * Runs the deterministic KrishiPingala decision engine.
 * Handles candidate identification, conflict resolution, intervention feedback loop,
 * and maximum step safeguards.
 */
export function runDecision(
  initialConditions: FarmConditions,
  rules: Rule[],
  maxSteps: number = 50
): DecisionResult {
  const initialVector = encode(initialConditions);
  let currentState: StateVector = [...initialVector];
  const steps: TraceStep[] = [];
  let stepNumber = 0;

  while (stepNumber < maxSteps) {
    stepNumber++;
    const currentSankhya = sankhya(currentState);
    const candidates = findCandidates(rules, currentState);

    if (candidates.length === 0) {
      steps.push({
        step: stepNumber,
        state: [...currentState],
        sankhya: currentSankhya,
        matchingRules: [],
        actionTaken: 'No matching rules found in rule base.',
      });

      return {
        status: 'ANIRNITA',
        statusMessage: 'No matching rule could be found for the given conditions.',
        initialState: initialVector,
        finalState: currentState,
        finalSankhya: currentSankhya,
        reason: 'Rule base does not contain an applicable pattern for this farm state.',
        steps,
      };
    }

    const resolution = resolveConflict(candidates)!;
    const winner = resolution.winner;

    if (winner.action.type === 'intervene') {
      // Intervention rule triggered
      const nextState: StateVector = [...currentState];
      if (winner.action.target === 'pest_pressure') {
        // High pest pressure (1) flipped to Low (0)
        nextState[3] = 0;
      }

      steps.push({
        step: stepNumber,
        state: [...currentState],
        sankhya: currentSankhya,
        matchingRules: candidates,
        winningRule: winner,
        conflictReason: resolution.reason,
        actionTaken: `Intervention on pest_pressure applied: pest status treated from High (1) to Low (0). State updated to [${nextState.join(', ')}].`,
        nextState: [...nextState],
      });

      // Update state and rerun cycle
      currentState = nextState;
      continue;
    }

    // Recommendation rule reached - terminal successful state (SIDDHA)
    steps.push({
      step: stepNumber,
      state: [...currentState],
      sankhya: currentSankhya,
      matchingRules: candidates,
      winningRule: winner,
      conflictReason: resolution.reason,
      actionTaken: `Recommendation determined: ${winner.action.crop}`,
    });

    return {
      status: 'SIDDHA',
      initialState: initialVector,
      finalState: currentState,
      finalSankhya: currentSankhya,
      winningRule: winner,
      recommendation: {
        crop: winner.action.crop || 'Recommended Crop',
        details: winner.action.details || '',
      },
      reason: resolution.reason,
      steps,
    };
  }

  // Maximum step threshold exceeded (ANAVASTHA)
  return {
    status: 'ANAVASTHA',
    statusMessage: 'Decision process stopped because the maximum number of steps was reached.',
    initialState: initialVector,
    finalState: currentState,
    finalSankhya: sankhya(currentState),
    reason: `Decision process exceeded the safety loop limit of ${maxSteps} iterations without stabilization.`,
    steps,
  };
}
