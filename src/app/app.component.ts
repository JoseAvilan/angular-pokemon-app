import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from "./pages/pokemon-list/pokemon-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pokemon-app';
}
