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
import { OverlayPanelModule } from 'primeng/overlaypanel';

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
    ChipModule,
    OverlayPanelModule
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

  // Nuevo Map para almacenar en caché los tipos de Pokémon
  private pokemonTypesCache = new Map<number, string[]>();
  loadingTypes = false;

  constructor() {
    // <-- NUEVO: Definimos las opciones del dropdown en el constructor
    this.sortOptions = [
      { label: 'Nombre (A-Z)', value: 'asc' },
      { label: 'Nombre (Z-A)', value: 'desc' },
      { label: 'Por defecto', value: 'none' }
    ];
  }

  // Cargar tipos al inicializar
  ngOnInit(): void {
    this.loading = true;
    
    // Cargar todos los tipos disponibles
    this.pokemonService.getAllTypes().subscribe(types => {
      // Filtrar para excluir "stellar" y "unknown"
      this.pokemonTypes = types
        .filter(name => name !== 'stellar' && name !== 'unknown')
        .map(name => ({ name }));
    });
    
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

  toggleFilterPanel(event: Event, op: any): void {
    op.toggle(event);
  }
  
  // Modificar el método getTypeColor para eliminar los tipos inexistentes
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
  
  toggleTypeFilter(type: string): void {
    const index = this.selectedTypes.indexOf(type);
    if (index > -1) {
      this.selectedTypes.splice(index, 1);
    } else {
      this.selectedTypes.push(type);
    }
    
    // Aplicar filtro inmediatamente
    this.first = 0;
    this.applyFilterSortAndPagination(this.first);
  }
  
  clearFilters(): void {
    this.selectedTypes = [];
  }

  // Añadir este método para limpiar todos los filtros a la vez
  clearAllTypes(): void {
    this.selectedTypes = [];
    
    // Aplicar filtro inmediatamente
    this.first = 0;
    this.applyFilterSortAndPagination(this.first);
  }
  
  // Modificar el método de filtrado para incluir tipos
  private applyFilterSortAndPagination(offset: number): void {
    let processedPokemons = [...this.allPokemons]; 

    // 1. Filtrar por término de búsqueda
    if (this.searchTerm) {
      processedPokemons = processedPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(this.searchTerm)
      );
    }
    
    // 2. Filtrar por tipo (si hay tipos seleccionados)
    if (this.selectedTypes.length > 0) {
      this.loadingTypes = true;
      
      // Filtrar solo los Pokémon cuyos tipos hayamos cargado y coincidan con la selección
      const filteredPromise = new Promise<PokemonListItem[]>((resolve) => {
        // Crear un array para almacenar las promesas de carga de tipos
        const typeLoadPromises: Promise<void>[] = [];
        
        // Para cada Pokémon, verificar si necesitamos cargar sus tipos
        processedPokemons.forEach(pokemon => {
          if (!this.pokemonTypesCache.has(pokemon.id)) {
            // Si no tenemos sus tipos en caché, crear una promesa para cargarlos
            const promise = new Promise<void>((resolveType) => {
              this.pokemonService.getPokemonTypes(pokemon.id).subscribe({
                next: (types) => {
                  this.pokemonTypesCache.set(pokemon.id, types);
                  resolveType();
                },
                error: () => {
                  // Si hay error, guardar un array vacío
                  this.pokemonTypesCache.set(pokemon.id, []);
                  resolveType();
                }
              });
            });
            typeLoadPromises.push(promise);
          }
        });
        
        // Esperar a que se carguen todos los tipos necesarios
        Promise.all(typeLoadPromises).then(() => {
          // Filtrar los Pokémon por tipo
          const filtered = processedPokemons.filter(pokemon => {
            const pokemonTypes = this.pokemonTypesCache.get(pokemon.id) || [];
            // Un Pokémon coincide si tiene al menos uno de los tipos seleccionados
            return this.selectedTypes.some(type => pokemonTypes.includes(type));
          });
          this.loadingTypes = false;
          resolve(filtered);
        });
      });
      
      // Esperar a que se complete el filtrado y actualizar la lista
      filteredPromise.then(filtered => {
        // Aplicar ordenamiento y paginación a los resultados filtrados
        if (this.sortState !== 'none') {
          filtered.sort((a, b) => {
            const result = a.name.localeCompare(b.name);
            return this.sortState === 'asc' ? result : -result;
          });
        }
        
        this.totalRecords = filtered.length;
        this.pokemons = filtered.slice(offset, offset + this.rows);
      });
      
      // Retornamos temprano ya que el resto se manejará de forma asíncrona
      return;
    }

    // 3. Ordenar (si no hay filtro por tipo)
    if (this.sortState !== 'none') {
      processedPokemons.sort((a, b) => {
        const result = a.name.localeCompare(b.name);
        return this.sortState === 'asc' ? result : -result;
      });
    }

    // 4. Paginar (si no hay filtro por tipo)
    this.totalRecords = processedPokemons.length;
    this.pokemons = processedPokemons.slice(offset, offset + this.rows);
  }
}