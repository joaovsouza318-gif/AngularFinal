import { CommonModule } from '@angular/common';

import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private atletaService: AtletaService,
    private router: Router,
  ) {}

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

  calcularImc(atleta: Pessoa): number | null {
    const peso = Number(atleta.peso);
    const altura = Number(atleta.altura);

    if (!peso || !altura || peso <= 0 || altura <= 0) {
      return null;
    }

    return peso / (altura * altura);
  }

  situacaoImc(atleta: Pessoa): string {
    const imc = this.calcularImc(atleta);

    if (imc === null) {
      return '-';
    }

    if (imc < 18.5) {
      return 'Abaixo do peso';
    }

    if (imc < 25) {
      return 'Peso normal';
    }

    if (imc < 30) {
      return 'Sobrepeso';
    }

    if (imc < 35) {
      return 'Obesidade grau I';
    }

    if (imc < 40) {
      return 'Obesidade grau II';
    }

    return 'Obesidade grau III';
  }

  editarAtleta(id?: number) {
    if (id === undefined) {
      return;
    }

    this.router.navigate(['/cadastroAtleta', id]);
  }

  removerAtleta(id?: number) {
    if (id === undefined) {
      return;
    }

    this.atletaService.remover(id).subscribe(() => {
      this.atualizarLista();
    });
  }

  private atualizarLista() {
    this.atletaService.listar().subscribe((dados) => {
      this.atletas.set(dados);
    });
  }
}
