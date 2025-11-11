import { Character, Homeworld, Species, Films, ApiResponse } from '../types';

const BASE_URL = 'https://swapi.dev/api';

const cache = new Map<string, any>();

async function getJson<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url) as T;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const data = await res.json();
  cache.set(url, data);
  return data as T;
}

export const swapiService = {
  async getPeople(page: number = 1): Promise<ApiResponse<Character>> {
    const url = `${BASE_URL}/people/?page=${page}`;

    return getJson<ApiResponse<Character>>(url);
  },

  async searchPeople(query: string): Promise<ApiResponse<Character>> {
    const url = `${BASE_URL}/people/?search=${encodeURIComponent(query)}`;
    return getJson<ApiResponse<Character>>(url);
  },

  async getHomeworld(url: string): Promise<Homeworld> {
    return getJson<Homeworld>(url);
  },

  async getSpecies(url: string): Promise<Species> {
    return getJson<Species>(url);
  },

  async getFilm(url: string): Promise<Films> {
    return getJson<Films>(url);
  },

  
  async getAllPeople(): Promise<Character[]> {
    let allCharacters: Character[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getPeople(page);
      allCharacters = [...allCharacters, ...response.results];
      hasMore = response.next !== null;
      page++;
    }

    return allCharacters;
  }
};
