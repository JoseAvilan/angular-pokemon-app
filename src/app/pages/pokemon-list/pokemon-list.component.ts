// src/app/pages/pokemon-list/pokemon-list.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { TableModule, TableLazyLoadEvent } from 'primeng/table'; // <-- CAMBIO 1: Importamos el tipo correcto
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {

  private pokemonService = inject(PokemonService);

  pokemons: PokemonListItem[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  loading: boolean = true;

  ngOnInit(): void {
  }

  // CAMBIO 2: Usamos el tipo TableLazyLoadEvent
  loadPokemons(event: TableLazyLoadEvent): void {
    this.loading = true;

    const offset = event.first ?? 0;
    const limit = event.rows ?? this.rows;

    this.pokemonService.getPokemons(limit, offset).subscribe(response => {
      this.pokemons = response.results;
      this.totalRecords = response.count;
      this.loading = false;
    });
  }
}