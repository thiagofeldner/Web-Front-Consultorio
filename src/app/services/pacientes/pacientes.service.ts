import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../../models/model.paciente';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private Url: string = `${environment.apiUrl}/pacientes`;

  constructor(private httpClient:HttpClient) { }

   getAll(): Observable<Paciente[]>{
      return this.httpClient.get<Paciente[]>(this.Url);
   }

   getByCodigo(codigo: number): Observable<Paciente>{
      return this.httpClient.get<Paciente>(`${this.Url}/${codigo}`);
   }

   getByNome(nome: string): Observable<Paciente[]>{
      return this.httpClient.get<Paciente[]>(`${this.Url}?nome=${nome}`);
   }

   post(paciente: Paciente): Observable<Paciente>{
      return this.httpClient.post<Paciente>(`${this.Url}`,paciente);
   }

   put(paciente:Paciente): Observable<Paciente>{
      return this.httpClient.put<Paciente>(`${this.Url}/${paciente.Codigo}`,paciente);
   }

   delete(codigo:number): Observable<void>{
      return this.httpClient.delete<void>(`${this.Url}/${codigo}`);
   }
}
