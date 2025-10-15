import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Para las rutas
import { provideHttpClient } from '@angular/common/http'; // Para peticiones a la API
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes'; // Importa rutas

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};