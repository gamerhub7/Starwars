export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];   
  species: string[]; 
  url: string;
  created: string;
}

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  population: string;
}

export interface Films {
  title: string;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthUser {
  email: string;
  token: string;
  refreshToken: string;
}
