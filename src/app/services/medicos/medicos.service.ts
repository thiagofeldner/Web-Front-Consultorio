import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../../models/model.medicos';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private Url: string = `${environment.apiUrl}/medicos`;

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<Medico[]>{
    return this.httpClient.get<Medico[]>(this.Url);
  }

  getById(id: number): Observable<Medico>{
    return this.httpClient.get<Medico>(`${this.Url}/${id}`);
  }

  getByCrm(crm: string): Observable<Medico>{
    return this.httpClient.get<Medico>(`${this.Url}?crm=${crm}`);
 }

  getByNome(nome: string): Observable<Medico[]>{
    return this.httpClient.get<Medico[]>(`${this.Url}?nome=${nome}`);
  }

  post(medico: Medico) :Observable<Medico>{
    return this.httpClient.post<Medico>(`${this.Url}`, medico);
  }

  put(medico: Medico) :Observable<Medico>{
    return this.httpClient.put<Medico>(`${this.Url}/${medico.Id}`, medico);
  }

  delete(id:number): Observable<void>{
    return this.httpClient.delete<void>(`${this.Url}/${id}`);
  }


}
