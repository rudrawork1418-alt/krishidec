import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { DecisionResult } from '../types';
import { DecisionTrace } from './DecisionTrace';

interface ResultCardProps {
  result: DecisionResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const isSiddha = result.status === 'SIDDHA';
  const isAnavastha = result.status === 'ANAVASTHA';
  const isAnirnita = result.status === 'ANIRNITA';

  return (
    <div
      id="decision-result-card"
      className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-sm transition-all"
    >
      {/* Top Bar with Status Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Decision Result
        </span>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <span
            id="decision-status-badge"
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
              isSiddha
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : isAnavastha
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {isSiddha && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            {isAnavastha && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
            {isAnirnita && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
            {result.status}
          </span>
        </div>
      </div>

      {/* Main Recommendation Body */}
      {isSiddha && result.recommendation && (
        <div className="py-5">
          <span className="text-xs uppercase font-medium tracking-wider text-slate-500 block mb-1">
            Recommendation
          </span>
          <h3
            id="recommended-crop-name"
            className="text-3xl font-bold tracking-tight text-slate-900 capitalize"
          >
            {result.recommendation.crop}
          </h3>
          {result.recommendation.details && (
            <p className="text-sm font-medium text-emerald-700 mt-0.5">
              {result.recommendation.details}
            </p>
          )}
        </div>
      )}

      {isAnavastha && (
        <div className="py-5">
          <span className="text-xs uppercase font-medium tracking-wider text-rose-600 block mb-1">
            Indeterminate Loop
          </span>
          <h3 className="text-xl font-semibold text-slate-900">
            Decision Process Stopped
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {result.statusMessage ||
              'Decision process stopped because the maximum number of steps was reached.'}
          </p>
        </div>
      )}

      {isAnirnita && (
        <div className="py-5">
          <span className="text-xs uppercase font-medium tracking-wider text-amber-600 block mb-1">
            Uncovered Condition
          </span>
          <h3 className="text-xl font-semibold text-slate-900">
            No Applicable Rule
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {result.statusMessage ||
              'No rule in the current rule base matches this farm state combination.'}
          </p>
        </div>
      )}

      {/* Farm State and Sankhya */}
      <div className="pt-4 pb-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Farm State
          </span>
          <div className="flex items-center gap-1.5">
            {result.finalState.map((bit, idx) => (
              <span
                key={idx}
                className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-mono font-bold text-slate-800 text-sm"
              >
                {bit}
              </span>
            ))}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            [ Soil, Monsoon, Season, Pest ]
          </span>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Sankhya
          </span>
          <div className="flex items-baseline gap-2">
            <span
              id="final-sankhya-value"
              className="text-2xl font-bold font-mono text-amber-800"
            >
              {result.finalSankhya}
            </span>
            <span className="text-xs text-slate-500">
              (Decimal Index)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            value = value × 2 + bit
          </span>
        </div>
      </div>

      {/* Applied Rule & Reason */}
      {result.winningRule && (
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Applied Rule
            </span>
            <p
              id="applied-rule-name"
              className="text-sm font-semibold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200"
            >
              {result.winningRule.name}
            </p>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Reason
            </span>
            <p
              id="conflict-resolution-reason"
              className="text-xs sm:text-sm text-slate-600 leading-relaxed italic"
            >
              &ldquo;{result.reason}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Expandable Decision Trace */}
      <DecisionTrace result={result} />
    </div>
  );
};
