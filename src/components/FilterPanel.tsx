import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  homeworlds: string[];
  species: string[];
  films: string[];
  selectedHomeworld: string;
  selectedSpecies: string;
  selectedFilm: string;
  onHomeworldChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onFilmChange: (value: string) => void;
  onClearFilters: () => void;
}

export const FilterPanel = ({
  homeworlds,
  species,
  films,
  selectedHomeworld,
  selectedSpecies,
  selectedFilm,
  onHomeworldChange,
  onSpeciesChange,
  onFilmChange,
  onClearFilters
}: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = selectedHomeworld || selectedSpecies || selectedFilm;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
          hasActiveFilters
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
        }`}
      >
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="ml-1 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
            {[selectedHomeworld, selectedSpecies, selectedFilm].filter(Boolean).length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-2xl p-4 w-80 z-10 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Filter Characters</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Homeworld
              </label>
              <select
                value={selectedHomeworld}
                onChange={(e) => onHomeworldChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Homeworlds</option>
                {homeworlds.map((hw) => (
                  <option key={hw} value={hw}>{hw}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Species
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => onSpeciesChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Species</option>
                {species.map((sp) => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Film Count
              </label>
              <select
                value={selectedFilm}
                onChange={(e) => onFilmChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Films</option>
                {films.map((film) => (
                  <option key={film} value={film}>{film} {film === '1' ? 'film' : 'films'}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
