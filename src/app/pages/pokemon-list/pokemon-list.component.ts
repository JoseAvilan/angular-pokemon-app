import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem, PokemonDetails } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown'; // <-- NUEVA IMPORTACIÓN

// --- Importaciones de Componentes y Módulos ---
import { FormsModule } from '@angular/forms';
import { PokemonDetailComponent } from '../../components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  // Añadimos DropdownModule a los imports
  imports: [ CommonModule, DecimalPipe, PaginatorModule, InputTextModule, FormsModule, DialogModule, ProgressSpinnerModule, PokemonDetailComponent, DropdownModule ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {

  private pokemonService = inject(PokemonService);
  
  private allPokemons: PokemonListItem[] = [];
  pokemons: PokemonListItem[] = [];

  totalRecords: number = 0;
  rows: number = 18;
  first: number = 0;
  loading: boolean = true;
  searchTerm: string = '';
  
  // Lógica de ordenamiento
  sortState: 'none' | 'asc' | 'desc' = 'none';
  sortOptions: any[]; // <-- NUEVO: Opciones para el dropdown
  selectedSort: string = ''; // <-- NUEVO: Valor seleccionado en el dropdown

  isDialogVisible: boolean = false;
  selectedPokemon: PokemonDetails | null = null;
  isLoadingDetails: boolean = false;

  constructor() {
    // <-- NUEVO: Definimos las opciones del dropdown en el constructor
    this.sortOptions = [
      { label: 'Nombre (A-Z)', value: 'asc' },
      { label: 'Nombre (Z-A)', value: 'desc' },
      { label: 'Por defecto', value: 'none' }
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.pokemonService.getAllPokemonNames().subscribe(response => {
      this.allPokemons = response.results;
      this.applyFilterSortAndPagination(this.first);
      this.loading = false;
    });
  }

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 18;
    this.applyFilterSortAndPagination(this.first);
  }

  onSearch(): void {
    this.first = 0;
    this.applyFilterSortAndPagination(this.first);
  }

  // <-- NUEVO: Este método se llama cuando el usuario cambia la opción del dropdown
  onSortChange(): void {
    this.sortState = this.selectedSort as 'asc' | 'desc' | 'none';
    this.first = 0;
    this.applyFilterSortAndPagination(this.first);
  }

  onCardSelect(pokemon: PokemonListItem): void {
    this.selectedPokemon = null;
    this.isLoadingDetails = true;
    this.isDialogVisible = true;

    this.pokemonService.getPokemonDetails(pokemon.name).subscribe(details => {
      this.selectedPokemon = details;
      this.isLoadingDetails = false;
    });
  }

  private applyFilterSortAndPagination(offset: number): void {
    let processedPokemons = [...this.allPokemons]; // Copiamos para no modificar el original

    // 1. Filtrar
    if (this.searchTerm) {
      processedPokemons = processedPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // 2. Ordenar
    if (this.sortState !== 'none') {
      processedPokemons.sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return this.sortState === 'asc' ? result : -result;
      });
    }

    // 3. Paginar
    this.totalRecords = processedPokemons.length;
    this.pokemons = processedPokemons.slice(offset, offset + this.rows);
  }
}