// src/app/pages/pokemon-list/pokemon-list.component.ts

import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // NgIf se importa desde aquí
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, InputTextModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {

  private pokemonService = inject(PokemonService);
  @ViewChild('pokemonTable') pokemonTable!: Table;

  private allPokemons: PokemonListItem[] = [];
  pokemons: PokemonListItem[] = [];

  totalRecords: number = 0;
  rows: number = 10;
  loading: boolean = false;
  searchTerm: string = '';
  
  // NUEVO: Variable para controlar el ordenamiento manualmente
  sortState: 'none' | 'asc' | 'desc' = 'none';

  loadPokemons(event: TableLazyLoadEvent): void {
    this.loading = true;
    if (this.allPokemons.length === 0) {
      this.pokemonService.getAllPokemonNames().subscribe(response => {
        this.allPokemons = response.results;
        this.applyFilterSortAndPagination(event.first ?? 0);
        this.loading = false;
      });
    } else {
      this.applyFilterSortAndPagination(event.first ?? 0);
      this.loading = false;
    }
  }

  onSearch(): void {
    this.pokemonTable.reset();
  }

  // NUEVO: Método para cambiar el estado del ordenamiento
  toggleSort(): void {
    if (this.sortState === 'none') {
      this.sortState = 'asc';
    } else if (this.sortState === 'asc') {
      this.sortState = 'desc';
    } else {
      this.sortState = 'none';
    }
    // Reseteamos la tabla para que se vuelva a cargar desde la página 1 con el nuevo orden
    this.pokemonTable.reset();
  }

  private applyFilterSortAndPagination(offset: number): void {
    let processedPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // MODIFICADO: Usamos nuestra variable 'sortState' en lugar del evento
    if (this.sortState !== 'none') {
      processedPokemons.sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return this.sortState === 'asc' ? result : -result;
      });
    }

    this.totalRecords = processedPokemons.length;
    this.pokemons = processedPokemons.slice(offset, offset + this.rows);
  }
}