import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa-model';

@Injectable({
    providedIn: 'root'
})

export class AtletaService {
    private atletas : Pessoa[] = [];
    
    adicionar(pessoa: Pessoa) {
        const ultimoId = this.atletas.at(-1)?.idPessoa ?? 0;
        pessoa.idPessoa = ultimoId + 1;
        this.atletas.push(pessoa);
    }

    listar(): Pessoa[] {
        return [...this.atletas];
    }

    private localizar(idAtleta: number){
        return this.atletas.findIndex(elem => elem.idPessoa === idAtleta);
    }

    remover (posicaoArray: number) {
        this.atletas.splice(1,posicaoArray);
    }

    remover2 (pessoa: Pessoa) {
        this.atletas.filter(elem => elem.idPessoa === pessoa.idPessoa);
    }

    alterar(pessoa: Pessoa) {
        const posicao = this.localizar(pessoa.idPessoa);
        if (posicao >= 0) {
            this.atletas[posicao] = pessoa;
        }
    }
}
