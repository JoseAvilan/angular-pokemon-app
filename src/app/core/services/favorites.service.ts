import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonListItem } from '../../interfaces/pokemon.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'pokemon_favorites';
  private favoritesSubject = new BehaviorSubject<number[]>(this.loadFavorites());
  
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  toggleFavorite(pokemonId: number): void {
    const currentFavorites = this.favoritesSubject.value;
    let updatedFavorites: number[];
    
    if (currentFavorites.includes(pokemonId)) {
      updatedFavorites = currentFavorites.filter(id => id !== pokemonId);
    } else {
      updatedFavorites = [...currentFavorites, pokemonId];
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
    this.favoritesSubject.next(updatedFavorites);
  }

  isFavorite(pokemonId: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.favorites$.subscribe(favorites => {
        observer.next(favorites.includes(pokemonId));
      });
    });
  }

  private loadFavorites(): number[] {
    const storedFavorites = localStorage.getItem(this.STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
}