import React from 'react';
import { Rule } from '../types';

interface RuleCardProps {
  rule: Rule;
}

export const RuleCard: React.FC<RuleCardProps> = ({ rule }) => {
  return (
    <div
      id={`rule-card-${rule.id}`}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3.5 hover:border-slate-300 transition-colors"
    >
      {/* Rule Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            Rule {rule.id} (Order: {rule.order})
          </span>
          <h3 className="text-base font-semibold text-slate-900 mt-1.5">
            {rule.name}
          </h3>
        </div>

        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
            rule.obligatory
              ? 'bg-amber-50 text-amber-900 border border-amber-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {rule.obligatory ? 'Obligatory' : 'Optional'}
        </span>
      </div>

      {/* Pattern & Specificity */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 block uppercase tracking-wider">
            Pattern
          </span>
          <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">
            {rule.pattern.join(', ')}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 block uppercase tracking-wider">
            Specificity
          </span>
          <span className="font-mono font-bold text-slate-800 text-sm mt-0.5 block">
            {rule.specificity}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Action:</span>
        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
          {rule.actionDisplay}
        </span>
      </div>
    </div>
  );
};
