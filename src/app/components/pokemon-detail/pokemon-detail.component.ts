import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetails } from '../../interfaces/pokemon.interfaces';
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
    ButtonModule,
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
    this.images = [];
    this.isShiny = false;
    if (this.pokemon && this.pokemon.sprites) {
      const frontDefault = this.pokemon.sprites.front_default;
      const frontShiny = this.pokemon.sprites.front_shiny;

      if (frontDefault) {
        this.images.push({ url: frontDefault, isShiny: false });
      }
      if (frontShiny) {
        this.images.push({ url: frontShiny, isShiny: true });
      }

      if (this.pokemon.types && this.pokemon.types.length > 0) {
        this.pokemonMainColor = this.getTypeColor(this.pokemon.types[0].type.name);
      } else {
        this.pokemonMainColor = '#E0E0E0';
      }
    }
  }

  onCarouselPageChange(event: any) {
    this.isShiny = this.images[event.page]?.isShiny || false;
  }

  calculateStatPercentage(baseStat: number, maxStat: number = 200): number {
    return (baseStat / maxStat) * 100;
  }

  calculateExpPercentage(baseExp: number, maxExp: number = 1000): number {
    return (baseExp / maxExp) * 100;
  }

  capitalize(text: string): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');
  }

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