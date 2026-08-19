import { Injectable } from '@angular/core';
import { Inscricao } from '../models/inscricao-model';

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {
  private inscricoes: Inscricao[] = [];

  adicionar(inscricao: Inscricao) {
    const ultimoId = this.inscricoes.at(-1)?.idInscricao ?? 0;
    inscricao.idInscricao = ultimoId + 1;
    this.inscricoes.push(inscricao);
  }

  listar(): Inscricao[] {
    return [...this.inscricoes];
  }
}
