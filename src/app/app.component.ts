// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from "./pages/pokemon-list/pokemon-list.component";
import { InputSwitchModule } from 'primeng/inputswitch'; 
import { FormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  // Añadir los nuevos módulos
  imports: [PokemonListComponent, InputSwitchModule, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLightTheme = false;
  isLoading = true;

  ngOnInit() {
    // Simular tiempo de carga de la aplicación
    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
  }

  onThemeChange(isLight: boolean): void {
    if (isLight) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }
}