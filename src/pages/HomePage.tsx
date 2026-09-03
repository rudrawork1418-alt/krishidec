import React from 'react';
import { ArrowRight, CheckCircle2, SlidersHorizontal, GitFork, Sprout } from 'lucide-react';
import { PageView } from '../components/Header';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 sm:py-16 px-4 space-y-12">
      {/* Compact Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          <Sprout className="w-3.5 h-3.5 text-emerald-600" />
          <span>Rule-Based Decision System</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          KrishiPingala
        </h1>

        <p className="text-lg sm:text-xl font-medium text-slate-700 max-w-xl mx-auto">
          Traditional farming decision rules made simple.
        </p>

        <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
          Enter your farm conditions to receive a rule-based farming recommendation.
        </p>

        <div className="pt-2">
          <button
            type="button"
            id="hero-analyze-button"
            onClick={() => onNavigate('analyze')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-xs cursor-pointer"
          >
            <span>Analyze Farm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3-Step Explanation */}
      <div className="pt-8 border-t border-slate-200">
        <h2 className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-sm mx-auto sm:mx-0">
              1
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Enter Conditions
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select soil type, monsoon forecast, season duration, and pest pressure.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center font-bold text-sm mx-auto sm:mx-0">
              2
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Apply Rules
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pattern matcher evaluates conditions against priority-ordered farming rules.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2.5 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-sm mx-auto sm:mx-0">
              3
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Get Recommendation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive a deterministic crop recommendation with clear rule explanation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
