import React from 'react';
import { FarmConditions, BinaryValue, StateVector } from '../types';
import { encode, sankhya } from '../engine/sankhya';
import { Play } from 'lucide-react';

interface FarmFormProps {
  conditions: FarmConditions;
  onChange: (conditions: FarmConditions) => void;
  onAnalyze: () => void;
}

interface FactorOption {
  label: string;
  sublabel: string;
  value: BinaryValue;
}

interface FactorConfig {
  id: keyof FarmConditions;
  name: string;
  description: string;
  options: [FactorOption, FactorOption];
}

const FACTORS: FactorConfig[] = [
  {
    id: 'soil',
    name: 'Soil Condition',
    description: 'Texture and water retention capacity',
    options: [
      { label: 'Laghu (0)', sublabel: 'Light soil', value: 0 },
      { label: 'Guru (1)', sublabel: 'Heavy soil', value: 1 },
    ],
  },
  {
    id: 'monsoon',
    name: 'Monsoon',
    description: 'Expected seasonal precipitation volume',
    options: [
      { label: 'Deficient (0)', sublabel: 'Sub-normal rainfall', value: 0 },
      { label: 'Adequate (1)', sublabel: 'Normal rainfall', value: 1 },
    ],
  },
  {
    id: 'season',
    name: 'Season Window',
    description: 'Crop maturity window duration',
    options: [
      { label: 'Laghu (0)', sublabel: 'Short window', value: 0 },
      { label: 'Guru (1)', sublabel: 'Long window', value: 1 },
    ],
  },
  {
    id: 'pest',
    name: 'Pest Pressure',
    description: 'Observed or forecast insect pest load',
    options: [
      { label: 'Low (0)', sublabel: 'Below threshold', value: 0 },
      { label: 'High (1)', sublabel: 'Severe infestation', value: 1 },
    ],
  },
];

export const FarmForm: React.FC<FarmFormProps> = ({
  conditions,
  onChange,
  onAnalyze,
}) => {
  const stateVector = encode(conditions);
  const currentSankhya = sankhya(stateVector);

  const handleSelect = (factor: keyof FarmConditions, value: BinaryValue) => {
    onChange({
      ...conditions,
      [factor]: value,
    });
  };

  const loadPreset = (preset: FarmConditions) => {
    onChange(preset);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
          Select Farm Conditions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Select each of the four physical conditions to determine the optimal crop action.
        </p>
      </div>

      {/* 4 Factor Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FACTORS.map((factor) => {
          const currentValue = conditions[factor.id];
          return (
            <div
              key={factor.id}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2.5"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {factor.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {factor.description}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                  bit: {currentValue}
                </span>
              </div>

              {/* 2 Options for each factor */}
              <div className="grid grid-cols-2 gap-2">
                {factor.options.map((option) => {
                  const isSelected = currentValue === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      id={`option-${factor.id}-${option.value}`}
                      onClick={() => handleSelect(factor.id, option.value)}
                      className={`p-2.5 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-semibold block ${
                            isSelected ? 'text-emerald-900' : 'text-slate-800'
                          }`}
                        >
                          {option.label}
                        </span>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {option.sublabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* State Vector & Sankhya Banner */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Farm State Vector
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            {stateVector.map((bit, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-md bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-900 text-sm shadow-xs"
              >
                {bit}
              </div>
            ))}
            <span className="text-xs text-slate-400 font-sans ml-2 hidden sm:inline">
              [ Soil, Monsoon, Season, Pest ]
            </span>
          </div>
        </div>

        <div className="w-full sm:w-auto sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-0.5">
            Sankhya
          </span>
          <div className="flex items-baseline sm:justify-end gap-1.5">
            <span
              id="farm-sankhya-display"
              className="text-2xl font-bold font-mono text-amber-800"
            >
              {currentSankhya}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              (val = val*2 + bit)
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Quick test presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 w-full sm:w-auto">
          <span className="font-medium text-slate-600 mr-1">Quick Presets:</span>
          <button
            type="button"
            id="preset-demo-case"
            onClick={() =>
              loadPreset({ soil: 1, monsoon: 0, season: 1, pest: 0 })
            }
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            Demo Case [1, 0, 1, 0]
          </button>
          <button
            type="button"
            id="preset-pest-case"
            onClick={() =>
              loadPreset({ soil: 0, monsoon: 0, season: 0, pest: 1 })
            }
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
          >
            Pest Case [0, 0, 0, 1]
          </button>
        </div>

        <button
          type="button"
          id="analyze-farm-button"
          onClick={onAnalyze}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Analyze Farm</span>
        </button>
      </div>
    </div>
  );
};
