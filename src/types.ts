export type BinaryValue = 0 | 1;

export interface FarmConditions {
  soil: BinaryValue; // 0 = Laghu (Light), 1 = Guru (Heavy)
  monsoon: BinaryValue; // 0 = Deficient, 1 = Adequate
  season: BinaryValue; // 0 = Laghu (Short), 1 = Guru (Long)
  pest: BinaryValue; // 0 = Low, 1 = High
}

export type StateVector = [BinaryValue, BinaryValue, BinaryValue, BinaryValue];

export type PatternElement = BinaryValue | '*';
export type RulePattern = [PatternElement, PatternElement, PatternElement, PatternElement];

export interface RuleAction {
  type: 'recommend' | 'intervene';
  target?: 'pest_pressure';
  crop?: string;
  details?: string;
}

export interface Rule {
  id: number;
  name: string;
  pattern: RulePattern;
  specificity: number;
  obligatory: boolean;
  order: number;
  action: RuleAction;
  actionDisplay: string;
}

export type DecisionStatus = 'SIDDHA' | 'ANAVASTHA' | 'ANIRNITA';

export interface TraceStep {
  step: number;
  state: StateVector;
  sankhya: number;
  matchingRules: Rule[];
  winningRule?: Rule;
  conflictReason?: string;
  actionTaken: string;
  nextState?: StateVector;
}

export interface DecisionResult {
  status: DecisionStatus;
  statusMessage?: string;
  initialState: StateVector;
  finalState: StateVector;
  finalSankhya: number;
  winningRule?: Rule;
  recommendation?: {
    crop: string;
    details?: string;
  };
  reason: string;
  steps: TraceStep[];
}
