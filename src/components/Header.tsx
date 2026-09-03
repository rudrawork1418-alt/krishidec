import React from 'react';
import { Sprout } from 'lucide-react';

export type PageView = 'home' | 'analyze' | 'rules';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
          id="brand-header-button"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-semibold tracking-tight text-slate-900 block leading-tight">
              KrishiPingala
            </span>
            <span className="text-[11px] text-slate-500 block -mt-0.5">
              Rule-Based Farming Engine
            </span>
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
          <button
            id="nav-home"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === 'home'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            id="nav-analyze"
            onClick={() => onNavigate('analyze')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === 'analyze'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Analyze Farm
          </button>
          <button
            id="nav-rules"
            onClick={() => onNavigate('rules')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === 'rules'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Rules
          </button>
        </nav>
      </div>
    </header>
  );
};
