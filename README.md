# Aplicación Pokédex con Angular

![Pokédex](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

## 📝 Descripción General

Una enciclopedia Pokémon moderna y responsive construida con Angular 19 y PrimeNG. Esta aplicación obtiene datos de [PokéAPI](https://pokeapi.co/) para mostrar información detallada sobre los Pokémon en una interfaz interactiva y visualmente atractiva.

## ✨ Características

- **Diseño Responsive** - Diseño optimizado tanto para dispositivos de escritorio como móviles
- **Cambio de Tema** - Alterna entre modos oscuro y claro para una visualización cómoda
- **Filtrado Avanzado** - Filtra Pokémon por tipo con resultados en tiempo real
- **Función de Búsqueda** - Encuentra Pokémon por nombre o ID
- **Opciones de Ordenamiento** - Organiza los Pokémon por diferentes criterios
- **Información Detallada** - Visualiza detalles completos de cada Pokémon incluyendo estadísticas, tipos y atributos físicos
- **Variantes Shiny** - Observa tanto sprites normales como shiny a través de un carrusel interactivo
- **Resultados Paginados** - Navega por la Pokédex con una paginación eficiente

## 🖼️ Capturas de Pantalla

_(Recomendación: Añade capturas de pantalla de tu aplicación mostrando diferentes características como la vista principal en cuadrícula, el popup de detalles, el filtrado y el cambio de tema)_

## 🛠️ Tecnologías Utilizadas

- **[Angular 19](https://angular.io/)** - Framework moderno de desarrollo web
- **[PrimeNG 19](https://primeng.org/)** - Biblioteca de componentes UI para Angular
- **[PrimeFlex](https://primeflex.org/)** - Biblioteca de utilidades CSS
- **[PrimeIcons](https://primeng.org/icons)** - Biblioteca de iconos
- **[PokéAPI](https://pokeapi.co/)** - API RESTful de Pokémon
- **TypeScript** - Para código con tipado seguro
- **SCSS** - Para estilos avanzados
- **RxJS** - Para patrones de programación reactiva

## 🚀 Primeros Pasos

### Requisitos Previos

- Node.js (v18.x o superior)
- npm (v9.x o superior)

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/angular-pokemon-app.git
cd angular-pokemon-app
```
2. Instala las dependencias 

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
ng serve -o
```

4. Abre tu navegador y navega a
[http://localhost:4200/]

### Compilación para Producción
Para compilar la aplicación para producción, ejecuta: 
```bash
npm run build
```

Esto creará una carpeta dist/angular-pokemon-app con todos los activos compilados listos para su implementación.

## 📂 Estructura del Proyecto

```bash
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   └── pokemon-detail/  # Componente popup de detalle de Pokémon
│   ├── core/                # Servicios principales y utilidades
│   │   └── services/        # Servicios de API y datos
│   ├── interfaces/          # Interfaces TypeScript
│   ├── pages/               # Componentes de páginas
│   │   └── pokemon-list/    # Página principal de lista de Pokémon
│   └── shared/              # Directivas y pipes compartidos
│       └── directives/      # Directivas personalizadas (p.ej. carga perezosa)
├── assets/                  # Activos estáticos
└── styles.scss    
```