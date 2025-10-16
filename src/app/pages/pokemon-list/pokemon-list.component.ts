import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem, PokemonDetails } from '../../interfaces/pokemon.interfaces';

// --- Importaciones de PrimeNG ---
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown'; 
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

// --- Importaciones de Componentes y Módulos ---
import { FormsModule } from '@angular/forms';
import { PokemonDetailComponent } from '../../components/pokemon-detail/pokemon-detail.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ 
    CommonModule, 
    DecimalPipe, 
    PaginatorModule, 
    InputTextModule, 
    FormsModule, 
    DialogModule, 
    ProgressSpinnerModule, 
    PokemonDetailComponent, 
    DropdownModule, 
    ScrollingModule,
    ButtonModule,
    ChipModule
  ],
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

  // Añadir estas propiedades
  showFilters = false;
  pokemonTypes = [
    { name: 'normal' }, { name: 'fire' }, { name: 'water' }, { name: 'grass' },
    { name: 'electric' }, { name: 'ice' }, { name: 'fighting' }, { name: 'poison' },
    { name: 'ground' }, { name: 'flying' }, { name: 'psychic' }, { name: 'bug' },
    { name: 'rock' }, { name: 'ghost' }, { name: 'dragon' }, { name: 'dark' },
    { name: 'steel' }, { name: 'fairy' }
  ];
  selectedTypes: string[] = [];

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

  // Añadir estos métodos
  toggleFilterPanel(): void {
    this.showFilters = !this.showFilters;
  }
  
  getTypeColor(type: string): string {
    const colorMap: Record<string, string> = {
      normal: '#A8A878', fire: '#F08030', water: '#6890F0', grass: '#78C850',
      electric: '#F8D030', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
      ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
      rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
      steel: '#B8B8D0', fairy: '#EE99AC'
    };
    return colorMap[type.toLowerCase()] || '#A8A878';
  }
  
  toggleTypeFilter(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }
  }
  
  clearFilters(): void {
    this.selectedTypes = [];
  }
  
  applyFilters(): void {
    this.first = 0;
    this.applyFilterSortAndPagination(this.first);
    this.showFilters = false;
  }
  
  // Modificar este método para incluir el filtro por tipo
  private applyFilterSortAndPagination(offset: number): void {
    let processedPokemons = [...this.allPokemons]; // Copiamos para no modificar el original

    // 1. Filtrar por término de búsqueda
    if (this.searchTerm) {
      processedPokemons = processedPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    // 2. Filtrar por tipo (solo si hay tipos seleccionados)
    if (this.selectedTypes.length > 0) {
      // Para filtrar por tipo, necesitaríamos tener la información de tipos
      // En este ejemplo, simulamos que no tenemos esa información a nivel de lista
      // Esta parte tendría que adaptarse según cómo obtienes los tipos de los Pokémon
      // Posiblemente necesites modificar tu servicio o extender la interfaz PokemonListItem
    }

    // 3. Ordenar
    if (this.sortState !== 'none') {
      processedPokemons.sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return this.sortState === 'asc' ? result : -result;
      });
    }

    // 4. Paginar
    this.totalRecords = processedPokemons.length;
    this.pokemons = processedPokemons.slice(offset, offset + this.rows);
  }
}