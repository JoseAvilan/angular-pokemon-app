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
}