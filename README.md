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

## 🔍 Características en Detalle

Vista de Cuadrícula de Pokémon

La vista principal muestra una cuadrícula de tarjetas de Pokémon con información básica:

- Número ID del Pokémon
- Imagen del sprite
- Nombre con formato adecuado

Vista de Detalle

Al hacer clic en una tarjeta de Pokémon se abre un popup detallado que muestra:

- Arte oficial de alta calidad
- Variante shiny (accesible a través del carrusel)
- Información de tipo con etiquetas codificadas por color
- Atributos físicos (altura/peso)
- Estadísticas base con barras de progreso visuales

Filtrado por Tipo en Tiempo Real

- Filtra por cualquier tipo de Pokémon (Fuego, Agua, Planta, etc.)
- Visualiza los resultados instantáneamente al seleccionar tipos
- Indicación visual de los filtros seleccionados
- Limpia los filtros con un solo clic

Soporte de Temas

Los usuarios pueden alternar entre temas oscuro y claro:

- Tema oscuro (predeterminado) optimizado para entornos con poca luz
- Tema claro para entornos brillantes
- Estilo consistente y legibilidad en ambos temas
- Preferencia de tema persistente

Diseño Responsive

La aplicación es completamente responsive:
- El diseño de cuadrícula se adapta al tamaño de la pantalla
- Vista de detalle optimizada para móviles
- Controles de filtro adaptados para interfaces táctiles
- Vista de detalle a pantalla completa en dispositivos móviles

## ⚙️ Configuración

La aplicación utiliza la configuración estándar de Angular. Puedes modificar:

- Endpoints de API en el servicio de Pokémon
- Colores del tema en las variables SCSS globales
- Comportamiento de los componentes a través de sus respectivos archivos

## 📊 Optimización del Rendimiento

- Paginación - Limita el número de elementos mostrados para un mejor rendimiento
- Caché - Los datos de Pokémon se almacenan en caché para reducir las llamadas a la API
- Filtrado por Tipo - Utiliza algoritmos eficientes para filtrar Pokémon por tipo

## 🙏 Créditos

- Datos de Pokémon proporcionados por PokéAPI
- Iconos de PrimeIcons
- Fuentes: Poppins y Press Start 2P de Google Fonts
- Componentes UI de PrimeNG

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

Nota: Esta Pokédex es una aplicación hecha por fans y no está afiliada con Nintendo, Game Freak o The Pokémon Company.