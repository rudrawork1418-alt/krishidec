import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, ArrowDown, ShieldAlert, Sparkles } from 'lucide-react';
import { DecisionResult } from '../types';

interface DecisionTraceProps {
  result: DecisionResult;
}

export const DecisionTrace: React.FC<DecisionTraceProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        id="toggle-decision-trace-button"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors border-b border-slate-200"
      >
        <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <span>View Decision Details</span>
          <span className="text-xs font-normal text-slate-500">
            ({result.steps.length} {result.steps.length === 1 ? 'step' : 'steps'})
          </span>
        </span>
        <div className="text-slate-500">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 text-sm space-y-5 bg-white">
          {/* Initial State */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
              Initial State
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-md font-mono text-slate-800 text-sm">
              [{result.initialState.join(', ')}]
            </div>
          </div>

          {/* Sequential Steps */}
          <div className="space-y-4">
            {result.steps.map((step, idx) => (
              <div
                key={step.step}
                className="relative pl-6 border-l-2 border-slate-200 space-y-3 pb-2 last:pb-0"
              >
                {/* Step dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                  {step.step}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                    Step {step.step}: State [{step.state.join(', ')}] (Sankhya: {step.sankhya})
                  </span>
                  {step.nextState && (
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                      Intervention
                    </span>
                  )}
                </div>

                {/* Matching Rules */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-1.5">
                  <span className="text-xs font-semibold text-slate-600 block">
                    Matching Rules ({step.matchingRules.length}):
                  </span>
                  {step.matchingRules.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                      {step.matchingRules.map((rule) => {
                        const isWinner = rule.id === step.winningRule?.id;
                        return (
                          <li
                            key={rule.id}
                            className={isWinner ? 'font-semibold text-emerald-900' : 'text-slate-600'}
                          >
                            <span>{rule.name}</span>
                            <span className="text-slate-400 font-normal ml-1">
                              (Pattern: [{rule.pattern.join(', ')}], Specificity: {rule.specificity}
                              {rule.obligatory ? ', Obligatory' : ', Optional'})
                            </span>
                            {isWinner && (
                              <span className="ml-1.5 text-[11px] text-emerald-700 font-medium">
                                ← Winner
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">No candidate rules matched.</p>
                  )}
                </div>

                {/* Winner & Reason */}
                {step.winningRule && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-slate-500 block text-[11px] font-medium">Winner:</span>
                      <span className="font-semibold text-slate-800 block mt-0.5">
                        {step.winningRule.name}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-slate-500 block text-[11px] font-medium">Reason:</span>
                      <span className="text-slate-700 block mt-0.5">
                        {step.conflictReason || 'Single candidate'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Taken */}
                <div className="text-xs text-slate-700 flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <ArrowDown className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Action:</strong> {step.actionTaken}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Final Outcome Summary */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-slate-500">Final Recommendation: </span>
              <strong className="text-slate-900">
                {result.recommendation?.crop || 'None'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Status: </span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  result.status === 'SIDDHA'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : result.status === 'ANAVASTHA'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {result.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
