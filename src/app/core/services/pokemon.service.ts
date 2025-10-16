import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // Se añade la importación de 'map'
import { PokemonListResponse, PokemonDetails } from '../../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor() { }

  /**
   * Obtiene una lista paginada de Pokémon.
   * @param limit El número de Pokémon a devolver.
   * @param offset El punto de inicio en la lista de Pokémon.
   * @returns Un Observable con la respuesta de la API.
   */
  getPokemons(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon`, {
      params: { limit, offset }
    });
  }
  
  /**
   * Obtiene la lista completa de todos los Pokémon, enriquecida con ID y URL de imagen.
   * @returns Un Observable con la respuesta de la API transformada.
   */
  getAllPokemonNames(): Observable<PokemonListResponse> {
    // Pedimos a la API un límite alto para traerlos todos. 
    // La API reporta ~1302 Pokémon, 2000 es un número seguro.
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon`, {
      params: { limit: 2000, offset: 0 }
    }).pipe(
      // Transformamos la respuesta para añadir los nuevos campos
      map(response => {
        response.results.forEach(pokemon => {
          // Extraemos el ID de la URL. Ej: ".../pokemon/25/" -> "25"
          const urlParts = pokemon.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2]);
          pokemon.id = id;
          
          // Construimos la URL de la imagen oficial de alta calidad
          pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        });
        return response;
      })
    );
  }

  /**
   * Obtiene los detalles completos de un Pokémon específico por su nombre.
   * @param name El nombre del Pokémon.
   * @returns Un Observable con los detalles del Pokémon.
   */
  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${name}`);
  }

  /**
   * Obtiene el esquema de colores para un tipo de Pokémon
   * @param type Tipo de Pokémon
   * @returns Objeto con colores primario, secundario y texto
   */
  getTypeColorScheme(type: string): { primary: string, secondary: string, text: string } {
    const colorMap: Record<string, { primary: string, secondary: string, text: string }> = {
      normal: { primary: '#A8A878', secondary: '#C6C6A7', text: '#212121' },
      fighting: { primary: '#C03028', secondary: '#D67873', text: '#FFFFFF' },
      flying: { primary: '#A890F0', secondary: '#C6B7F5', text: '#212121' },
      poison: { primary: '#A040A0', secondary: '#C183C1', text: '#FFFFFF' },
      ground: { primary: '#E0C068', secondary: '#EBD69D', text: '#212121' },
      rock: { primary: '#B8A038', secondary: '#D1C17D', text: '#212121' },
      bug: { primary: '#A8B820', secondary: '#C6D16E', text: '#212121' },
      ghost: { primary: '#705898', secondary: '#A292BC', text: '#FFFFFF' },
      steel: { primary: '#B8B8D0', secondary: '#D1D1E0', text: '#212121' },
      fire: { primary: '#F08030', secondary: '#F5AC78', text: '#212121' },
      water: { primary: '#6890F0', secondary: '#9DB7F5', text: '#212121' },
      grass: { primary: '#78C850', secondary: '#A7DB8D', text: '#212121' },
      electric: { primary: '#F8D030', secondary: '#FAE078', text: '#212121' },
      psychic: { primary: '#F85888', secondary: '#FA92B2', text: '#212121' },
      ice: { primary: '#98D8D8', secondary: '#BCE6E6', text: '#212121' },
      dragon: { primary: '#7038F8', secondary: '#A27DFA', text: '#FFFFFF' },
      dark: { primary: '#705848', secondary: '#A29288', text: '#FFFFFF' },
      fairy: { primary: '#EE99AC', secondary: '#F4BDC9', text: '#212121' },
      unknown: { primary: '#68A090', secondary: '#9DC1B7', text: '#212121' },
      shadow: { primary: '#604E82', secondary: '#8E7EAD', text: '#FFFFFF' },
    };

    return colorMap[type.toLowerCase()] || { primary: '#A8A878', secondary: '#C6C6A7', text: '#212121' };
  }
}