import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa-model';

@Injectable({
    providedIn: 'root'
})
export class AtletaService {
    private readonly apiUrl = 'http://127.0.0.1:8000/pessoa';

    constructor(private http: HttpClient) {}

    adicionar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post<Pessoa>(`${this.apiUrl}/`, pessoa);
    }

    listar(): Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>(`${this.apiUrl}/`);
    }

    remover(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    alterar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.put<Pessoa>(`${this.apiUrl}/${pessoa.id}`, pessoa);
    }
}
