/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, PageView } from './components/Header';
import { HomePage } from './pages/HomePage';
import { FarmAnalysisPage } from './pages/FarmAnalysisPage';
import { RulesPage } from './pages/RulesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('analyze');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Navigation Header */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'analyze' && <FarmAnalysisPage />}
        {currentPage === 'rules' && <RulesPage />}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            KrishiPingala &mdash; Deterministic Rule-Based Farming Decision System
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-slate-800 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('analyze')}
              className="hover:text-slate-800 transition-colors"
            >
              Analyze Farm
            </button>
            <button
              onClick={() => setCurrentPage('rules')}
              className="hover:text-slate-800 transition-colors"
            >
              Rules
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

