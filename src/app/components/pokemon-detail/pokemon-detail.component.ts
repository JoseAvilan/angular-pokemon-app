// src/app/components/pokemon-detail/pokemon-detail.component.ts

import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetails } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    ProgressBarModule,
    CarouselModule,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {
  @Input() pokemon: PokemonDetails | null = null;

  images: string[] = [];
  pokemonMainColor: string = '#E0E0E0'; // Color por defecto

  ngOnChanges() {
    this.images = []; // Limpia las imágenes anteriores
    if (this.pokemon && this.pokemon.sprites) {
      // Limpia la lógica del carrusel y prioriza la imagen oficial
      if (this.pokemon.sprites.other?.['official-artwork']?.front_default) {
        this.images.push(this.pokemon.sprites.other['official-artwork'].front_default);
      }
      
      // Añadimos otros sprites (front_default, front_shiny, etc.) si no es la imagen principal
      Object.values(this.pokemon.sprites)
        .filter(sprite => typeof sprite === 'string' && sprite)
        .forEach(sprite => {
          if (sprite !== this.images[0]) { // Evitar duplicar la imagen oficial
            this.images.push(sprite as string);
          }
        });
      
      // Asignar color principal basado en el primer tipo
      if (this.pokemon.types && this.pokemon.types.length > 0) {
        this.pokemonMainColor = this.getTypeColor(this.pokemon.types[0].type.name);
      } else {
        this.pokemonMainColor = '#E0E0E0'; // Resetea a gris si no hay tipo
      }
    }
  }

  // CORREGIDO: Función para calcular el porcentaje de una estadística
  calculateStatPercentage(baseStat: number, maxStat: number = 200): number {
    return (baseStat / maxStat) * 100;
  }

  // CORREGIDO: Función para calcular el porcentaje de la experiencia
  calculateExpPercentage(baseExp: number, maxExp: number = 1000): number {
    return (baseExp / maxExp) * 100;
  }

  // Función para capitalizar nombres (ej. "fire" -> "Fire", "special-attack" -> "Special Attack")
  capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');
  }

  // Función para obtener el color de un tipo de Pokémon
  getTypeColor(typeName: string): string {
    switch (typeName.toLowerCase()) {
      case 'normal': return '#A8A77A';
      case 'fire': return '#EE8130';
      case 'water': return '#6390F0';
      case 'ice': return '#96D9D6';
      case 'grass': return '#7AC74C';
      case 'electric': return '#F7D02C';
      case 'fighting': return '#C22E28';
      case 'poison': return '#A33EA1';
      case 'ground': return '#E2BF65';
      case 'flying': return '#A98FF3';
      case 'psychic': return '#F95587';
      case 'bug': return '#A6B91A';
      case 'rock': return '#B6A136';
      case 'ghost': return '#735797';
      case 'dragon': return '#6F35FC';
      case 'steel': return '#B7B7CE';
      case 'fairy': return '#D685AD';
      case 'dark': return '#705746';
      default: return '#68A090';
    }
  }

  // Función para obtener el color de la barra de stat
  getStatBarColor(statName: string): string {
    switch (statName.toLowerCase()) {
      case 'hp': return '#FF5959'; 
      case 'attack': return '#F5AC78'; 
      case 'defense': return '#FAE078'; 
      case 'special-attack': return '#9DB7F5'; 
      case 'special-defense': return '#A7DB8D'; 
      case 'speed': return '#FA92B2'; 
      default: return '#C0C0C0';
    }
  }

  // Función para formatear el nombre del stat (ej. 'hp' -> 'HP', 'attack' -> 'ATK')
  formatStatName(statName: string): string {
    switch (statName.toLowerCase()) {
      case 'hp': return 'HP';
      case 'attack': return 'ATK';
      case 'defense': return 'DEF';
      case 'special-attack': return 'SATK';
      case 'special-defense': return 'SDEF';
      case 'speed': return 'SPD';
      default: return this.capitalize(statName);
    }
  }
}