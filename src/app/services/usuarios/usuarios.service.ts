import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Usuario } from '../../models/model.usuario';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class UsuariosService {
  private Url: string = `${environment.apiUrl}/usuarios`;

  constructor(private httpClient: HttpClient, private router: Router) {}

  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.Url);
  }

  getById(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.Url}/${id}`);
  }

  getByNome(nome: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.Url}?nome=${nome}`);
  }

  post(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.Url}`, usuario);
  }

  put(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.Url}/${usuario.Id}`, usuario);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.Url}/${id}`);
  }
}
