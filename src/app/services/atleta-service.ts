import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa-model';

@Injectable({
    providedIn: 'root'
})
export class AtletaService {
    private apiUrl = 'https://6a8629109c451dc67a646a59.mockapi.io/Atletas';

    constructor(private http: HttpClient) {}

    adicionar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post<Pessoa>(this.apiUrl, pessoa);
    }

    listar(): Observable<Pessoa[]> {
      return this.http.get<any[]>(this.apiUrl).pipe(
          map(lista => lista.map(item => ({ ...item, idPessoa: Number(item.idPessoa) })))
      );
  }

    remover(idPessoa: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${idPessoa}`);
    }

    alterar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.idPessoa}`, pessoa);
    }
}
