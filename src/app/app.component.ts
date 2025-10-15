// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from "./pages/pokemon-list/pokemon-list.component";
import { InputSwitchModule } from 'primeng/inputswitch'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-root',
  // Añadir los nuevos módulos
  imports: [RouterOutlet, PokemonListComponent, InputSwitchModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLightTheme = false;

  onThemeChange(isLight: boolean): void {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }
}