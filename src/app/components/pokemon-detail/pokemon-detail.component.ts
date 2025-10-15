// src/app/components/pokemon-detail/pokemon-detail.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetails } from '../../interfaces/pokemon.interfaces';

// Importaciones de PrimeNG
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    CarouselModule
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  @Input() pokemon: PokemonDetails | null = null;

  get images(): string[] {
    if (!this.pokemon) return [];
    
    const sprites = this.pokemon.sprites;
    const images: string[] = [];

    // Agrega las imágenes que existan
    if (sprites.other?.['official-artwork']?.front_default) {
      images.push(sprites.other['official-artwork'].front_default);
    }
    if (sprites.other?.['official-artwork']?.front_shiny) {
      images.push(sprites.other['official-artwork'].front_shiny);
    }
    if (sprites.front_default) images.push(sprites.front_default);
    if (sprites.front_shiny) images.push(sprites.front_shiny);
    if (sprites.back_default) images.push(sprites.back_default);
    if (sprites.back_shiny) images.push(sprites.back_shiny);

    return images;
  }
}