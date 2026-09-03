import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { AtletaComponent } from './components/atleta-component/atleta-component';
import { CorridasComponent } from './components/corridas-component/corridas-component';
import { ListarCorridasComponent } from './components/listar-corridas-component/listar-corridas-component';
import { InscricaoComponent } from './components/inscricao-component/inscricao-component';
import { ListarAtletasComponent } from './components/listar-atletas-component/listar-atletas-component';

export const routes: Routes = [
  {path:'',redirectTo:"/home",pathMatch: 'full'},
  {path:"home", component:HomeComponent},
  {path:"cadastroAtleta", component:AtletaComponent},
  {path:"cadastroAtleta/:id", component:AtletaComponent},
  {path:"cadastroCorrida", component:CorridasComponent},
  {path:"cadastroCorrida/:id", component:CorridasComponent},
  {path:"listarCorridas", component:ListarCorridasComponent},
  {path:"listarAtletas", component:ListarAtletasComponent},
  {path:"inscrevaSe", component:InscricaoComponent}
];
