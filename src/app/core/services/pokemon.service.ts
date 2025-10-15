import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse } from '../../interfaces/pokemon.interfaces';

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
}