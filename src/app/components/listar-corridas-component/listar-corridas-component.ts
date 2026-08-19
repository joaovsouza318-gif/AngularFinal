import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida-model';
import { CorridaService } from '../../services/corrida-service';

@Component({
  selector: 'app-listar-corridas-component',
  imports: [CommonModule],
  templateUrl: './listar-corridas-component.html',
  styleUrl: './listar-corridas-component.css',
})
export class ListarCorridasComponent implements OnInit {
  corridas: Corrida[] = [];

  constructor(private corridaService: CorridaService) {}

  ngOnInit() {
    this.atualizarLista();
  }

  removerCorrida(idCorrida: number) {
    this.corridaService.remover(idCorrida);
    this.atualizarLista();
  }

  private atualizarLista() {
    this.corridas = this.corridaService.listar();
  }
}
