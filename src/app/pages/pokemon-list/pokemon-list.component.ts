// src/app/pages/pokemon-list/pokemon-list.component.ts

import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem, PokemonDetails } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { Table, TableLazyLoadEvent, TableModule, TableRowSelectEvent } from 'primeng/table'; 
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// --- Importaciones de Componentes y Módulos ---
import { FormsModule } from '@angular/forms';
import { PokemonDetailComponent } from '../../components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ CommonModule, TableModule, PaginatorModule, InputTextModule, FormsModule, DialogModule, ProgressSpinnerModule, PokemonDetailComponent ],
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
  sortState: 'none' | 'asc' | 'desc' = 'none';

  isDialogVisible: boolean = false;
  selectedPokemon: PokemonDetails | null = null;
  isLoadingDetails: boolean = false;

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

  toggleSort(): void {
    if (this.sortState === 'none') {
      this.sortState = 'asc';
    } else if (this.sortState === 'asc') {
      this.sortState = 'desc';
    } else {
      this.sortState = 'none';
    }
    this.pokemonTable.reset();
  }

  onRowSelect(event: TableRowSelectEvent): void {
    if (event.data && !Array.isArray(event.data)) {
      const pokemon: PokemonListItem = event.data;

      this.selectedPokemon = null;
      this.isLoadingDetails = true;
      this.isDialogVisible = true;

      this.pokemonService.getPokemonDetails(pokemon.name).subscribe(details => {
        this.selectedPokemon = details;
        this.isLoadingDetails = false;
      });
    }
  }

  private applyFilterSortAndPagination(offset: number): void {
    let processedPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

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