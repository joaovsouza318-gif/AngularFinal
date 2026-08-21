import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inscricao } from '../models/inscricao-model';

@Injectable({
  providedIn: 'root',
})
export class InscricaoService {
  private apiUrl = 'https://6a87994270fbbd308f990dc5.mockapi.io/inscricao';

  constructor(private http: HttpClient) {}

  adicionar(inscricao: Inscricao): Observable<Inscricao> {
    return this.http.post<Inscricao>(this.apiUrl, inscricao);
  }

  listar(): Observable<Inscricao[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(item => ({ ...item, idInscricao: Number(item.idInscricao) })))
    );
  }

  remover(idInscricao: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idInscricao}`);
  }
}
