import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { useEnvironmental, BENCHMARK_CITIES, LocationSelection } from '../../context/EnvironmentalContext';
import { api } from '../../services/api';
import { clientLogger } from '../../utils/logger';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({ isOpen, onClose }) => {
  const { setLocation, location: currentLocation } = useEnvironmental();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.searchLocations(query);
        setResults(res);
      } catch (err) {
        clientLogger.error('Location search failed', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (loc: LocationSelection) => {
    setLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-[var(--bg-card)] rounded-2xl border border-[var(--border-main)] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[var(--border-main)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 id="modal-title" className="text-base sm:text-lg font-bold text-[var(--text-main)]">Select Location</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 sm:p-6 border-b border-[var(--border-main)] bg-[var(--bg-card-secondary)]">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any global city (e.g. Lahore, Milan, Chicago)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
            )}
          </div>

          {/* Benchmark Presets */}
          <div className="mt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
              Winter Smog & Urban Benchmarks:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {BENCHMARK_CITIES.map((bench) => (
                <button
                  key={bench.name}
                  onClick={() => handleSelect(bench)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    currentLocation.city === bench.city
                      ? 'bg-emerald-600 text-white border-emerald-600 font-medium'
                      : 'border-[var(--border-main)] bg-[var(--bg-card)] text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                  }`}
                >
                  {bench.city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results list */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 divide-y divide-[var(--border-main)]">
          {results.length > 0 ? (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelect({
                  name: r.name,
                  city: r.city,
                  country: r.country,
                  latitude: r.latitude,
                  longitude: r.longitude
                })}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-semibold text-[var(--text-main)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {r.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    Lat: {r.latitude.toFixed(3)}, Lon: {r.longitude.toFixed(3)}
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-[var(--text-subtle)] group-hover:text-emerald-600" />
              </button>
            ))
          ) : query.trim().length >= 2 && !isSearching ? (
            <div className="text-center py-8 text-sm text-[var(--text-muted)]">
              No matching locations found for "{query}". Try another city name.
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[var(--text-subtle)]">
              Type at least 2 characters to search global Open-Meteo geocoding database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
