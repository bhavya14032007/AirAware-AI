import React from 'react';
import { Github, Shield, HeartPulse, ExternalLink, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border-main)] bg-[var(--bg-card)] mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-base text-[var(--text-main)]">AirAware AI</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              GenAI-powered pollution intelligence helping families, asthmatics, children, and communities navigate winter smog emergencies, reduce particulate exposure, and adopt measurable low-emission habits.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/airaware-ai/airaware-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
              >
                <Github className="w-4 h-4" />
                <span>github.com/airaware-ai/airaware-ai</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Environmental Attribution & Methodology */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-subtle)]">Data & Models</h4>
            <ul className="text-xs text-[var(--text-muted)] space-y-1.5">
              <li>• Atmosphere: Open-Meteo & Copernicus Atmosphere (CAMS)</li>
              <li>• Standards: US EPA AQI Standard & WHO 2021 Air Quality Guidelines</li>
              <li>• Emission Factors: EPA / European Environment Agency (EEA) passenger benchmarks</li>
              <li>• AI Reasoning: Google Gemini 1.5 Flash (Backend Zod Verified)</li>
            </ul>
          </div>

          {/* Medical & Safety Disclaimer */}
          <div className="space-y-2 bg-[var(--bg-card-secondary)] p-4 rounded-xl border border-[var(--border-main)]">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <HeartPulse className="w-4 h-4" />
              <span>Public Health Notice</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              AirAware AI provides general atmospheric exposure reduction guidance and environmental intelligence. It does <strong>not</strong> provide medical diagnosis, clinical treatment plans, or emergency respiratory care. Always consult healthcare professionals for medical conditions.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-subtle)]">
          <p>© {new Date().getFullYear()} AirAware AI. Built with accessible HTML5, 8px grid design, and responsible AI grounding.</p>
          <p className="flex items-center gap-1">
            <span>Powered by Open Environmental APIs & GenAI</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
