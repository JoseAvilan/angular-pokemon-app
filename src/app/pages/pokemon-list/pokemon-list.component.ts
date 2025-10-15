// src/app/pages/pokemon-list/pokemon-list.component.ts

import { Component, ViewChild, inject } from '@angular/core'; // <-- CAMBIO: Importa ViewChild
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table'; // <-- CAMBIO: Importa Table
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
  
  // Con ViewChild, obtenemos una referencia directa a la tabla en el HTML.
  @ViewChild('pokemonTable') pokemonTable!: Table;

  private allPokemons: PokemonListItem[] = [];
  pokemons: PokemonListItem[] = [];

  totalRecords: number = 0;
  rows: number = 10;
  loading: boolean = false;
  searchTerm: string = '';

  // Esta es AHORA la única función que carga y procesa datos.
  loadPokemons(event: TableLazyLoadEvent): void {
    this.loading = true;

    // Si la lista maestra no está cargada, la cargamos UNA SOLA VEZ.
    if (this.allPokemons.length === 0) {
      this.pokemonService.getAllPokemonNames().subscribe(response => {
        this.allPokemons = response.results;
        // Una vez cargada, aplicamos el filtro y la paginación del evento.
        this.applyFilterAndPagination(event.first ?? 0);
        this.loading = false;
      });
    } else {
      // Si la lista ya existe, solo aplicamos el filtro y la paginación.
      this.applyFilterAndPagination(event.first ?? 0);
      this.loading = false;
    }
  }

  // El método de búsqueda ahora es mucho más simple.
  onSearch(): void {
    // Llama al método reset() de la tabla, que automáticamente
    // disparará el evento onLazyLoad con los valores iniciales (página 1).
    this.pokemonTable.reset();
  }

  // Esta función no cambia, sigue siendo la lógica central de procesamiento.
  private applyFilterAndPagination(offset: number): void {
    const filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalRecords = filteredPokemons.length;
    this.pokemons = filteredPokemons.slice(offset, offset + this.rows);
  }
}