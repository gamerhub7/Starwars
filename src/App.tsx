import { useState, useEffect, useMemo } from 'react';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';
import { Pagination } from './components/Pagination';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useAuth } from './hooks/useAuth';
import { swapiService } from './services/swapi';
import { Character, Species } from './types';
import { getSpeciesColor } from './utils/colors';
import { authService } from './services/auth';

interface CharacterWithSpecies extends Character {
  speciesName: string;
  homeworldName: string;
}

function App() {
  const { user, loading: authLoading, logout, setUser } = useAuth();
  const [characters, setCharacters] = useState<CharacterWithSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterWithSpecies | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHomeworld, setSelectedHomeworld] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (user) {
      fetchAllCharacters();
    }
  }, [user]);

  const fetchAllCharacters = async () => {
    setLoading(true);
    setError('');

    try {
      const allPeople = await swapiService.getAllPeople();

      const charactersWithDetails = await Promise.all(
        allPeople.map(async (character) => {
          let speciesName = 'Human';
          let homeworldName = 'Unknown';

          if (character.species.length > 0) {
            try {
              const speciesData: Species = await swapiService.getSpecies(character.species[0]);
              speciesName = speciesData.name;
            } catch (err) {
              console.error('Failed to fetch species:', err);
            }
          }

          try {
            const homeworldData = await swapiService.getHomeworld(character.homeworld);
            homeworldName = homeworldData.name;
          } catch (err) {
            console.error('Failed to fetch homeworld:', err);
          }

          return {
            ...character,
            speciesName,
            homeworldName
          };
        })
      );

      setCharacters(charactersWithDetails);
    } catch (err) {
      setError('Failed to fetch characters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesHomeworld = !selectedHomeworld || character.homeworldName === selectedHomeworld;
      const matchesSpecies = !selectedSpecies || character.speciesName === selectedSpecies;
      const matchesFilm = !selectedFilm || character.films.length.toString() === selectedFilm;

      return matchesSearch && matchesHomeworld && matchesSpecies && matchesFilm;
    });
  }, [characters, searchQuery, selectedHomeworld, selectedSpecies, selectedFilm]);

  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCharacters.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCharacters, currentPage]);

  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const uniqueHomeworlds = useMemo(() => {
    return Array.from(new Set(characters.map(c => c.homeworldName))).sort();
  }, [characters]);

  const uniqueSpecies = useMemo(() => {
    return Array.from(new Set(characters.map(c => c.speciesName))).sort();
  }, [characters]);

  const uniqueFilmCounts = useMemo(() => {
    return Array.from(new Set(characters.map(c => c.films.length.toString()))).sort((a, b) => parseInt(a) - parseInt(b));
  }, [characters]);

  const handleClearFilters = () => {
    setSelectedHomeworld('');
    setSelectedSpecies('');
    setSelectedFilm('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedHomeworld, selectedSpecies, selectedFilm]);

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginForm onLoginSuccess={() => setUser(authService.getCurrentUser())} />;
  }

  return (
    <div className="relative min-h-screen">
      <video
        className="pointer-events-none absolute inset-0 w-full h-full object-cover"
        src="/space.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />

      <div className="relative z-10">
        <Header user={user} onLogout={logout} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
          <div className="relative z-20 mb-8 flex flex-col sm:flex-row  gap-4 items-center justify-between">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />
            <FilterPanel
              homeworlds={uniqueHomeworlds}
              species={uniqueSpecies}
              films={uniqueFilmCounts}
              selectedHomeworld={selectedHomeworld}
              selectedSpecies={selectedSpecies}
              selectedFilm={selectedFilm}
              onHomeworldChange={setSelectedHomeworld}
              onSpeciesChange={setSelectedSpecies}
              onFilmChange={setSelectedFilm}
              onClearFilters={handleClearFilters}
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={fetchAllCharacters} />
          ) : filteredCharacters.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-700">No characters found matching your criteria.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCharacters.map((character) => (
                  <CharacterCard
                    key={character.url}
                    character={character}
                    speciesName={character.speciesName}
                    gradientColor={getSpeciesColor(character.speciesName)}
                    onClick={() => setSelectedCharacter(character)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  hasNext={currentPage < totalPages}
                  hasPrevious={currentPage > 1}
                />
              )}
            </>
          )}
        </main>

        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            gradientColor={getSpeciesColor(selectedCharacter.speciesName)}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
