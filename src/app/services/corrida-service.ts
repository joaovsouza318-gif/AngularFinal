import { Injectable } from '@angular/core';
import { Corrida } from './../models/corrida-model';

@Injectable({
    providedIn: 'root'
})

export class CorridaService {
    private listaCorridas : Corrida[] = [];

    adicionar(corrida: Corrida) {
        corrida.idCorrida = this.listaCorridas.length + 1;
        this.listaCorridas.push(corrida);
    }

    listar(): Corrida[] {
        console.table(this.listaCorridas);
        return this.listaCorridas;
    }

    private localizar(idCorridas: number){
        return this.listaCorridas.findIndex(elem => elem.idCorrida === idCorridas);
    }

    remover (posicaoArray: number) {
        this.listaCorridas.splice(1,posicaoArray);
    }

    remover2 (corrida: Corrida) {
        this.listaCorridas.filter(elem => elem.idCorrida === corrida.idCorrida);
    }

    alterar(corrida: Corrida) {
        const posicao = this.localizar(corrida.idCorrida);
        if (posicao >= 0) {
            this.listaCorridas[posicao] = corrida;
        }
    }
}
