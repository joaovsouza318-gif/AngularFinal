import { CommonModule } from '@angular/common';

import { Component, OnInit, signal } from '@angular/core';

import { Pessoa } from '../../models/pessoa-model';

import { AtletaService } from '../../services/atleta-service';

@Component({
  selector: 'app-listar-atletas-component',
  imports: [CommonModule],
  templateUrl: './listar-atletas-component.html',
  styleUrl: './listar-atletas-component.css',
})
export class ListarAtletasComponent implements OnInit {
  atletas = signal<Pessoa[]>([]);

  constructor(private atletaService: AtletaService) {}

  ngOnInit() {
    this.atualizarLista();
  }

  calcularIdade(dataNascimento: string): number | string {
    if (!dataNascimento) {
      return '-';
    }

    const nascimento = new Date(`${dataNascimento}T00:00:00`);

    if (Number.isNaN(nascimento.getTime())) {
      return '-';
    }

    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const diferencaMes = hoje.getMonth() - nascimento.getMonth();

    if (
      diferencaMes < 0 ||
      (diferencaMes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  removerAtleta(idAtleta?: number) {
    if (idAtleta === undefined) {
      return;
    }

    this.atletaService.remover(idAtleta).subscribe(() => {
      this.atualizarLista();
    });
  }

  private atualizarLista() {
    this.atletaService.listar().subscribe((dados) => {
      this.atletas.set(dados);
    });
  }
}
