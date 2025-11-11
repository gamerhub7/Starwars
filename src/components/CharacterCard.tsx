import { Character } from '../types';
import { getRandomImageUrl } from '../utils/colors';

interface CharacterCardProps {
  character: Character;
  speciesName: string;
  gradientColor: string;
  onClick: () => void;
}

export const CharacterCard = ({ character, speciesName, gradientColor, onClick }: CharacterCardProps) => {
  const imageUrl = getRandomImageUrl(character.name);

  return (
    <button
      onClick={onClick}
      className="group text-left cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      aria-label={`Open ${character.name} details`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-white text-xl font-bold">{character.name}</h3>
        </div>
      </div>

      <div className={`h-2 bg-gradient-to-r ${gradientColor}`} />

      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span className="font-semibold">Species:</span>
            <span>{speciesName}</span>
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <span>{character.films.length} film{character.films.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </button>
  );
};
