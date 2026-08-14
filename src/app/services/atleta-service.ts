import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa-model';

@Injectable({
    providedIn: 'root'
})

export class AtletaService {
    private atletas : Pessoa[] = [];
    
    adicionar(pessoa: Pessoa) {
        pessoa.idPessoa = this.atletas.length + 1;
        this.atletas.push(pessoa);
    }

    listar(): Pessoa[] {
        console.table(this.atletas);
        return this.atletas;
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
