export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatHeight = (height: string): string => {
  const heightNum = parseFloat(height);
  if (isNaN(heightNum)) return height;
  return `${(heightNum / 100).toFixed(2)} m`;
};

export const formatMass = (mass: string): string => {
  if (mass === 'unknown') return mass;
  return `${mass} kg`;
};

export const formatPopulation = (population: string): string => {
  if (population === 'unknown') return population;
  const num = parseInt(population);
  if (isNaN(num)) return population;
  return num.toLocaleString();
};
