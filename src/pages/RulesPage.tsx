import React from 'react';
import { INITIAL_RULES } from '../data/rules';
import { RuleCard } from '../components/RuleCard';
import { Info } from 'lucide-react';

export const RulesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Rule Base
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Deterministic knowledge base representing traditional agricultural heuristics.
        </p>
      </div>

      {/* Conflict Resolution Principle Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">
            Conflict Resolution Precedence:
          </p>
          <p className="text-slate-600 leading-relaxed">
            1. <strong>Specificity</strong> (higher count of matched conditions wins) →{' '}
            2. <strong>Obligatory</strong> (mandatory rules override optional rules) →{' '}
            3. <strong>Declaration Order</strong> (higher order breaks remaining ties).
          </p>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_RULES.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </div>
  );
};
