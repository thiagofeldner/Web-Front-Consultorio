import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../../models/model.login';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../models/model.usuario';

@Injectable({
  providedIn: 'root',
})
export class AutenticarService {

  private readonly Url:string;
  // private Url: string = `${environment.apiUrl}/autenticacoes`;

  constructor(private httpClient: HttpClient) {
    this.Url = `${environment.apiUrl}/autenticacoes`;
  }

  autenticar(login: Login): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.Url, login).pipe(
      tap({
        next: (jsonUsuario: Usuario) => {
          localStorage.setItem('usuario', btoa(JSON.stringify(jsonUsuario)));
        },
      })
    );
  }

  desautenticar() {
    localStorage.clear();
  }

  obterUsuarioAutenticado(): Usuario {
    const usuario: string | null = localStorage.getItem('usuario');
    return usuario !== null ? JSON.parse(atob(usuario)) : null;
  }

  get isAutenticado(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }
}
