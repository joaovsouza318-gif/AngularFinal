import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu-component/menu-component';
import { AtletaComponent } from './components/atleta-component/atleta-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent,AtletaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('esporte');
}
