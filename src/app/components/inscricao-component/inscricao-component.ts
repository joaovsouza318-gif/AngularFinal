import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Corrida } from '../../models/corrida-model';
import { Inscricao } from '../../models/inscricao-model';
import { Pessoa } from '../../models/pessoa-model';
import { AtletaService } from '../../services/atleta-service';
import { CorridaService } from '../../services/corrida-service';
import { InscricaoService } from '../../services/inscricao-service';

interface InscricaoExibicao {
  id: number;
  atleta: string;
  corrida: string;
  data: Date | null;
  modalidade: string;
}

@Component({
  selector: 'app-inscricao-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './inscricao-component.html',
  styleUrl: './inscricao-component.css',
})
export class InscricaoComponent implements OnInit {
  atletas: Pessoa[] = [];
  corridas: Corrida[] = [];
  inscricoes: InscricaoExibicao[] = [];
  idAtleta: number | null = null;
  idCorrida: number | null = null;

  constructor(
    private atletaService: AtletaService,
    private corridaService: CorridaService,
    private inscricaoService: InscricaoService,
  ) {}

  ngOnInit() {
    forkJoin({
      atletas: this.atletaService.listar(),
      corridas: this.corridaService.listar(),
    }).subscribe(({ atletas, corridas }) => {
      this.atletas = atletas;
      this.corridas = corridas;
      this.atualizarInscricoes();
    });
  }

  salvarInscricao() {
    if (this.idAtleta === null || this.idCorrida === null) {
      return;
    }

    const inscricao = new Inscricao();
    inscricao.idAtleta = this.idAtleta;
    inscricao.idCorrida = this.idCorrida;
    this.inscricaoService.adicionar(inscricao);
    this.idAtleta = null;
    this.idCorrida = null;
    this.atualizarInscricoes();
  }

  private atualizarInscricoes() {
    this.inscricoes = this.inscricaoService.listar().flatMap((inscricao) => {
      const atleta = this.atletas.find((item) => item.idPessoa === inscricao.idAtleta);
      const corrida = this.corridas.find((item) => item.idCorrida === inscricao.idCorrida);

      if (!atleta || !corrida) {
        return [];
      }

      return [{
        id: inscricao.idInscricao,
        atleta: atleta.nome,
        corrida: corrida.descricao,
        data: corrida.data,
        modalidade: corrida.niveis,
      }];
    });
  }
}
