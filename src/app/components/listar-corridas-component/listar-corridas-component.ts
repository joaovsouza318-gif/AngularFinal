import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Corrida } from '../../models/corrida-model';
import { CorridaService } from '../../services/corrida-service';

@Component({
  selector: 'app-listar-corridas-component',
  imports: [CommonModule],
  templateUrl: './listar-corridas-component.html',
  styleUrl: './listar-corridas-component.css',
})
export class ListarCorridasComponent implements OnInit {
  corridas = signal<Corrida[]>([]);

  constructor(
    private corridaService: CorridaService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.atualizarLista();
  }

  editarCorrida(idCorrida: number) {
    this.router.navigate(['/cadastroCorrida', idCorrida]);
  }

  removerCorrida(idCorrida: number) {
    this.corridaService.remover(idCorrida).subscribe(() => {
      this.atualizarLista();
    });
  }

  private atualizarLista() {
    this.corridaService.listar().subscribe(dados => {
      this.corridas.set(dados);
    });
  }
}
