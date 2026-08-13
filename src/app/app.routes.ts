import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { AtletaComponent } from './components/atleta-component/atleta-component';

export const routes: Routes = [
  {path:'',redirectTo:"/home",pathMatch: 'full'},
  {path:"home", component:HomeComponent},
  {path:"cadastroAtleta", component:AtletaComponent}
];
