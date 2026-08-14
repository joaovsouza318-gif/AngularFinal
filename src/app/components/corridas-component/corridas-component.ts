import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CorridaService } from '../../services/corrida-service';
import { Corrida } from '../../models/corrida-model';

@Component({
  selector: 'app-corridas-component',
  imports: [FormsModule],
  templateUrl: './corridas-component.html',
  styleUrl: './corridas-component.css',
})
export class CorridasComponent {
  descricao = '';
  data = null;
  niveis = '';

  constructor(private corridaService: CorridaService) {}

  exibirDados(){
    console.log(this.descricao,this.data,this.niveis)
  }

  salvarCorrida(){
    const novaCorrida = new Corrida();
    novaCorrida.descricao = this.descricao;
    novaCorrida.data = this.data;
    novaCorrida.niveis = this.niveis;

    this.corridaService.adicionar(novaCorrida)
  }
}
