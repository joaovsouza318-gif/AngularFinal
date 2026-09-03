import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
  atletas = signal<Pessoa[]>([]);
  corridas = signal<Corrida[]>([]);
  inscricoes = signal<InscricaoExibicao[]>([]);
  idAtleta: number | null = null;
  idCorrida: number | null = null;
  modalidade = '';

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
      this.atletas.set(atletas);
      this.corridas.set(corridas);
      this.atualizarInscricoes();
    });
  }

  corridaAlterada() {
    this.modalidade = '';
  }

  modalidadesDaCorrida(): string[] {
    if (this.idCorrida === null) {
      return [];
    }

    const corrida = this.corridas()
      .find((item) => item.idCorrida === this.idCorrida);

    return corrida ? this.parseModalidades(corrida.niveis) : [];
  }

  salvarInscricao() {
    if (
      this.idAtleta === null ||
      this.idCorrida === null ||
      !this.modalidade
    ) {
      return;
    }

    const inscricao = new Inscricao();
    inscricao.idAtleta = this.idAtleta;
    inscricao.idCorrida = this.idCorrida;
    inscricao.modalidade = this.modalidade;

    this.inscricaoService.adicionar(inscricao).subscribe(() => {
      this.idAtleta = null;
      this.idCorrida = null;
      this.modalidade = '';
      this.atualizarInscricoes();
    });
  }

  private parseModalidades(niveis: string): string[] {
    if (!niveis) {
      return [];
    }

    return niveis
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private atualizarInscricoes() {
    const atletas = this.atletas();
    const corridas = this.corridas();

    this.inscricaoService.listar().subscribe(inscricoes => {
      const lista = inscricoes.flatMap((inscricao) => {
        const atleta = atletas.find((item) => item.id === inscricao.idAtleta);
        const corrida = corridas.find((item) => item.idCorrida === inscricao.idCorrida);

        if (!atleta || !corrida) {
          return [];
        }

        const modalidadesCorrida = this.parseModalidades(corrida.niveis);

        return [{
          id: inscricao.idInscricao,
          atleta: atleta.nome,
          corrida: corrida.descricao,
          data: corrida.data,
          modalidade: inscricao.modalidade || modalidadesCorrida[0] || '-',
        }];
      });

      this.inscricoes.set(lista);
    });
  }
}
