import { Injectable } from '@angular/core';
import { Corrida } from './../models/corrida-model';

@Injectable({
    providedIn: 'root'
})

export class CorridaService {
    private listaCorridas : Corrida[] = [];

    adicionar(corrida: Corrida) {
        const ultimoId = this.listaCorridas.at(-1)?.idCorrida ?? 0;
        corrida.idCorrida = ultimoId + 1;
        this.listaCorridas.push(corrida);
    }

    listar(): Corrida[] {
        return [...this.listaCorridas];
    }

    private localizar(idCorridas: number){
        return this.listaCorridas.findIndex(elem => elem.idCorrida === idCorridas);
    }

    remover(idCorrida: number) {
        const posicao = this.localizar(idCorrida);
        if (posicao >= 0) {
            this.listaCorridas.splice(posicao, 1);
        }
    }

    alterar(corrida: Corrida) {
        const posicao = this.localizar(corrida.idCorrida);
        if (posicao >= 0) {
            this.listaCorridas[posicao] = corrida;
        }
    }
}
