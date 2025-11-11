export const getSpeciesColor = (speciesName: string): string => {
  const colorMap: Record<string, string> = {
    'Human': 'from-blue-400 to-blue-600',
    'Droid': 'from-gray-400 to-gray-600',
    'Wookiee': 'from-amber-700 to-amber-900',
    'Rodian': 'from-green-400 to-green-600',
    'Hutt': 'from-yellow-500 to-orange-600',
    "Yoda's species": 'from-emerald-400 to-emerald-600',
    'Trandoshan': 'from-lime-500 to-lime-700',
    'Mon Calamari': 'from-cyan-400 to-cyan-600',
    'Ewok': 'from-rose-400 to-rose-600',
    'Sullustan': 'from-pink-400 to-pink-600',
    'Neimodian': 'from-teal-400 to-teal-600',
    'Gungan': 'from-orange-400 to-orange-600',
    'Toydarian': 'from-sky-400 to-sky-600',
    'Dug': 'from-red-400 to-red-600',
    "Twi'lek": 'from-fuchsia-400 to-fuchsia-600',
    'Aleena': 'from-violet-400 to-violet-600',
    'Vulptereen': 'from-stone-400 to-stone-600',
    'Xexto': 'from-zinc-400 to-zinc-600',
    'Toong': 'from-neutral-400 to-neutral-600',
    'Cerean': 'from-slate-400 to-slate-600',
    'Nautolan': 'from-emerald-500 to-emerald-700',
    'Zabrak': 'from-red-500 to-red-700',
    'Tholothian': 'from-blue-500 to-blue-700',
    'Iktotchi': 'from-rose-500 to-rose-700',
    'Quermian': 'from-amber-500 to-amber-700',
    'Kel Dor': 'from-orange-500 to-orange-700',
    'Chagrian': 'from-sky-500 to-sky-700',
    'Geonosian': 'from-lime-600 to-lime-800',
    'Mirialan': 'from-green-500 to-green-700',
    'Clawdite': 'from-teal-500 to-teal-700',
    'Besalisk': 'from-cyan-500 to-cyan-700',
    'Kaminoan': 'from-slate-500 to-slate-700',
    'Skakoan': 'from-stone-500 to-stone-700',
    'Muun': 'from-zinc-500 to-zinc-700',
    "Pau'an": 'from-gray-500 to-gray-700',
    'default': 'from-slate-400 to-slate-600'
  };

  return colorMap[speciesName] || colorMap['default'];
};

export const getRandomImageUrl = (seed: string): string => {
  const id = Math.abs(
    seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000
  );
  
  return `https://picsum.photos/seed/${id}/400/260`;
};
