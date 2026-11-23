import React, { useState } from 'react';
import { X, Users, Shield, HeartPulse, Check, Info } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { HouseholdProfile } from '../../types';

interface HouseholdProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HouseholdProfileModal: React.FC<HouseholdProfileModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState<HouseholdProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state if profile changes
  React.useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-main)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600 text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 id="profile-modal-title" className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                Household Safety & Vulnerability Profile
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Personalize AI smog warnings and routines based on your family's real constraints
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Household Size & Vulnerable Members */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] mb-3">
              Household Demographics & Vulnerabilities
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-main)] block mb-1">
                  Household Size: <span className="text-emerald-600 font-bold">{formData.householdSize} people</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={formData.householdSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, householdSize: Number(e.target.value) }))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-main)] block mb-1">
                  Daily Outdoor Hours: <span className="text-emerald-600 font-bold">{formData.dailyOutdoorHours}h</span>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={8}
                  step={0.5}
                  value={formData.dailyOutdoorHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, dailyOutdoorHours: Number(e.target.value) }))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer hover:bg-[var(--bg-hover)]">
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasChildren: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">Has Young Children (&lt; 12 yrs)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer hover:bg-[var(--bg-hover)]">
                <input
                  type="checkbox"
                  checked={formData.hasElderly}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasElderly: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">Has Elderly Family (&gt; 65 yrs)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer hover:bg-[var(--bg-hover)]">
                <input
                  type="checkbox"
                  checked={formData.hasAsthmaRespiratory}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasAsthmaRespiratory: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">Asthma / Chronic Respiratory Sensitivity</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer hover:bg-[var(--bg-hover)]">
                <input
                  type="checkbox"
                  checked={formData.hasHeartConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasHeartConditions: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">Cardiovascular / Heart Condition</span>
              </label>
            </div>
          </div>

          {/* Commute Mode & Budget Tier */}
          <div className="pt-4 border-t border-[var(--border-main)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)] mb-3">
              Mobility & Equipment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-main)] block mb-1">
                  Primary Commute Method
                </label>
                <select
                  value={formData.commuteMode}
                  onChange={(e) => setFormData(prev => ({ ...prev, commuteMode: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] text-xs text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="transit">Public Transit (Metro / Bus)</option>
                  <option value="car">Car (Solo Vehicle)</option>
                  <option value="bike">Bicycle / Electric Two-Wheeler</option>
                  <option value="walk">Walking</option>
                  <option value="remote">Work from Home / Remote</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-main)] block mb-1">
                  Household Budget Tier
                </label>
                <select
                  value={formData.budgetTier}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetTier: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] text-xs text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="free">Zero-Cost Solutions Only</option>
                  <option value="low_cost">Low Cost ($10 - $50 DIY)</option>
                  <option value="moderate">Moderate ($50 - $150)</option>
                  <option value="premium">Premium Equipment ($150+)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasAirPurifier}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasAirPurifier: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">Has Air Purifier</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasN95Masks}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasN95Masks: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">Has N95 Masks</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card-secondary)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasHepaAcFilters}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasHepaAcFilters: e.target.checked }))}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
                <span className="text-xs font-medium text-[var(--text-main)]">HEPA / MERV AC</span>
              </label>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-main)] text-[11px] text-[var(--text-subtle)] flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Profile information remains strictly private to your device/session. Used exclusively by backend AI to calibrate particulate exposure advice and window schedules.</span>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[var(--border-main)] text-xs font-semibold text-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              {isSaved ? <Check className="w-4 h-4" /> : null}
              <span>{isSaved ? 'Saved!' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
