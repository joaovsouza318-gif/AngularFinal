import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Corrida } from './../models/corrida-model';

@Injectable({
    providedIn: 'root'
})
export class CorridaService {
    private apiUrl = 'https://6a8629109c451dc67a646a59.mockapi.io/Corridas';

    constructor(private http: HttpClient) {}

    adicionar(corrida: Corrida): Observable<Corrida> {
        return this.http.post<Corrida>(this.apiUrl, corrida);
    }

    listar(): Observable<Corrida[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
          map(lista => lista.map(item => ({ ...item, idCorrida: Number(item.idCorrida) })))
      );
  }

    remover(idCorrida: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${idCorrida}`);
    }

    alterar(corrida: Corrida): Observable<Corrida> {
        return this.http.put<Corrida>(`${this.apiUrl}/${corrida.idCorrida}`, corrida);
    }
}
