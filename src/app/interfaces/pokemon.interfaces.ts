export interface PokemonListResponse {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url:  string;
}

// Interfaces para los detalles del Pokémon

export interface PokemonDetails {
  id:             number;
  name:           string;
  height:         number;
  weight:         number;
  sprites:        Sprites;
  stats:          Stat[];
  types:          Type[];
  abilities:      Ability[];
  base_experience: number;
}

export interface Sprites {
  front_default:       string;
  front_shiny:         string;
  front_female:        null | string;
  front_shiny_female:  null | string;
  back_default:        string;
  back_shiny:          string;
  back_female:         null | string;
  back_shiny_female:   null | string;
  other?: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface Stat {
  base_stat: number;
  effort:    number;
  stat:      PokemonListItem;
}

export interface Type {
  slot: number;
  type: PokemonListItem;
}

export interface Ability {
  ability:   PokemonListItem;
  is_hidden: boolean;
  slot:      number;
}