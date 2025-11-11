import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Character, Homeworld } from '../types';
import { formatDate, formatHeight, formatMass, formatPopulation } from '../utils/format';
import { getRandomImageUrl } from '../utils/colors';
import { swapiService } from '../services/swapi';

interface CharacterModalProps {
  character: Character;
  gradientColor: string; 
  onClose: () => void;
}

export const CharacterModal = ({ character, gradientColor, onClose }: CharacterModalProps) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchDetails = async () => {
      try {
      
        const hw = await swapiService.getHomeworld(character.homeworld);
        setHomeworld(hw);

        
        const titles = await Promise.all(
          character.films.map(async (url) => {
            const film = await swapiService.getFilm(url);
            return film.title;
          })
        );
        setFilmTitles(titles);
      } catch (err) {
        console.error('Failed to load one or more resources:', err);
        setFilmTitles([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [character.homeworld, character.films]);

  const imageUrl = getRandomImageUrl(character.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64">
          <img src={imageUrl} alt={character.name} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} opacity-40`} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 shadow-lg"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-3xl font-bold text-white">{character.name}</h2>
          </div>
        </div>

        <div className={`h-1 bg-gradient-to-r ${gradientColor}`} />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 font-medium">Height</p>
              <p className="text-lg font-semibold text-gray-900">{formatHeight(character.height)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Mass</p>
              <p className="text-lg font-semibold text-gray-900">{formatMass(character.mass)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hair color</p>
              <p className="text-lg font-semibold text-gray-900">{character.hair_color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Skin color</p>
              <p className="text-lg font-semibold text-gray-900">{character.skin_color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Eye color</p>
              <p className="text-lg font-semibold text-gray-900">{character.eye_color}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Birth Year</p>
              <p className="text-lg font-semibold text-gray-900">{character.birth_year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Gender</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{character.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Date Added</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(character.created)}</p>
            </div>

            
            <div className="col-span-2">
              <p className="text-sm text-gray-500 font-medium">Films</p>
              {loading ? (
                <div className="flex items-center gap-2 py-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                  <span className="text-gray-700">Loading films…</span>
                </div>
              ) : filmTitles.length > 0 ? (
                <>
                  <p className="text-lg font-semibold text-gray-900">
                    {filmTitles.length} 
                  </p>
                  <div className="mt-2 space-y-1">
                    {filmTitles.map((title, i) => (
                      <p key={i} className="text-sm text-gray-700">• {title}</p>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No films listed.</p>
              )}
            </div>
          </div>

          
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Homeworld</h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : homeworld ? (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{homeworld.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Terrain</p>
                    <p className="text-base text-gray-900 capitalize">{homeworld.terrain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Climate</p>
                    <p className="text-base text-gray-900 capitalize">{homeworld.climate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Population</p>
                  <p className="text-base text-gray-900">{formatPopulation(homeworld.population)}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Failed to load homeworld data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
