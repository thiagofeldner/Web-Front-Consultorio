import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from '../../models/model.medicamento';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MedicamentosService {

  private Url: string = `${environment.apiUrl}/medicamentos`;

  constructor(private httpClient:HttpClient) {
  }

  getAll() :Observable<Medicamento[]>{
    return this.httpClient.get<Medicamento[]>(this.Url);
  }

  getById(id:number) :Observable<Medicamento>{
    return this.httpClient.get<Medicamento>(`${this.Url}/${id}`);
  }

  getByNome(nome:string) :Observable<Medicamento[]>{
    return this.httpClient.get<Medicamento[]>(`${this.Url}?nome=${nome}`);
  }

  put(medicamento: Medicamento) :Observable<Medicamento>{
    return this.httpClient.put<Medicamento>(`${this.Url}/${medicamento.Id}`,medicamento);
  }

  post(medicamento: Medicamento) :Observable<Medicamento>{
    return this.httpClient.post<Medicamento>(`${this.Url}`,medicamento);
  }

  delete(id:number) :Observable<void>{
    return this.httpClient.delete<void>(`${this.Url}/${id}`);
  }
}
