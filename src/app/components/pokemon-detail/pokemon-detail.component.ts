import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetails } from '../../interfaces/pokemon.interfaces';

// Importaciones de PrimeNG
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    TagModule,
    ProgressBarModule,
    CarouselModule,
    ButtonModule
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {
  @Input() pokemon: PokemonDetails | null = null;
  @Output() onClose = new EventEmitter<void>();

  images: { url: string, isShiny: boolean }[] = [];
  pokemonMainColor: string = '#E0E0E0';
  isShiny: boolean = false;

  ngOnChanges() {
    if (this.pokemon) {
      this.setupImages();
      this.setMainColor();
    }
  }
  
  // Método para configurar las imágenes
  private setupImages() {
    if (!this.pokemon) return;
    
    this.images = [
      { 
        url: this.pokemon.sprites.other?.['official-artwork']?.front_default || 
             this.pokemon.sprites.front_default || '', 
        isShiny: false 
      },
      { 
        url: this.pokemon.sprites.other?.['official-artwork']?.front_shiny || 
             this.pokemon.sprites.front_shiny || '', 
        isShiny: true 
      }
    ].filter(img => img.url); // Filtrar imágenes vacías
  }
  
  // Método para determinar el color principal basado en el tipo
  private setMainColor() {
    if (!this.pokemon || !this.pokemon.types.length) return;
    
    const mainType = this.pokemon.types[0].type.name;
    this.pokemonMainColor = this.getTypeColor(mainType);
  }

  // Método para obtener el color de un tipo
  getTypeColor(type: string): string {
    const colorMap: Record<string, string> = {
      normal: '#D3D3D3', fire: '#F08030', water: '#6890F0', grass: '#78C850',
      electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
      ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
      steel: '#B8B8D0', fairy: '#EE99AC'
    };
    return colorMap[type.toLowerCase()] || '#A8A878';
  }

  // Método para obtener el color de la barra de estadísticas
  getStatBarColor(statName: string): string {
    const colorMap: Record<string, string> = {
      hp: '#FF5959',
      attack: '#F5AC78',
      defense: '#FAE078',
      'special-attack': '#9DB7F5',
      'special-defense': '#A7DB8D',
      speed: '#FA92B2'
    };
    return colorMap[statName] || '#A8A8A8';
  }

  // Método para formatear el nombre de la estadística
  formatStatName(statName: string): string {
    const statNameMap: Record<string, string> = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SpA',
      'special-defense': 'SpD',
      speed: 'SPD'
    };
    return statNameMap[statName] || statName;
  }

  // Método para calcular el porcentaje de una estadística
  calculateStatPercentage(value: number): number {
    // Valor máximo posible de las estadísticas base (255 es el máximo técnico)
    const maxStatValue = 255;
    return Math.min(100, (value / maxStatValue) * 100);
  }

  // Método para manejar el cambio de página en el carrusel
  onCarouselPageChange(event: any) {
    this.isShiny = event.page === 1;
  }

  // Método para capitalizar texto
  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}