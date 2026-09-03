import React, { useState, useRef } from 'react';
import { FarmConditions, DecisionResult } from '../types';
import { INITIAL_RULES } from '../data/rules';
import { runDecision } from '../engine/engine';
import { FarmForm } from '../components/FarmForm';
import { ResultCard } from '../components/ResultCard';

export const FarmAnalysisPage: React.FC = () => {
  // Initial default sets the key demo case [1, 0, 1, 0]
  const [conditions, setConditions] = useState<FarmConditions>({
    soil: 1, // Guru (1)
    monsoon: 0, // Deficient (0)
    season: 1, // Guru (1)
    pest: 0, // Low (0)
  });

  const [result, setResult] = useState<DecisionResult | null>(() => {
    // Run initial demo calculation so user immediately sees a working result
    return runDecision({ soil: 1, monsoon: 0, season: 1, pest: 0 }, INITIAL_RULES);
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = () => {
    const outcome = runDecision(conditions, INITIAL_RULES);
    setResult(outcome);

    // Scroll smoothly to result if on mobile
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Farm Analysis
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Configure physical farm parameters below and run the deterministic rule engine.
        </p>
      </div>

      {/* Input Form */}
      <FarmForm
        conditions={conditions}
        onChange={setConditions}
        onAnalyze={handleAnalyze}
      />

      {/* Result Section */}
      {result && (
        <div ref={resultRef} className="space-y-3">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
};
