import { Component, inject } from '@angular/core';
import { Medico } from '../../../models/model.medicos';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-medicos-index',
  templateUrl: './medicos-index.component.html',
  styleUrl: './medicos-index.component.css'
})
export class MedicosIndexComponent {
  Medicos: Medico[];
  Id: number | null;
  CRM: string;
  Nome: String;

  displayedColumns: string[] = ['Id', 'CRM', 'Nome'];

  constructor(private medicosServices: MedicosService, private dialog: MatDialog){
    this.Medicos = [];
    this.Id = null;
    this.CRM = '';
    this.Nome = '';
  }

  definirPesquisa(): void{
    this.Medicos = [];

    if(this.Id || this.Id === 0){
      this.pesquisarPorId();
      return;
    }

    if(this.Nome){
      this.pesquisarPorNome();
      return;
    }

    if(this.CRM){
      this.pesquisarPorCrm();
      return;
    }
    this.pesquisarTodos();
  }

  pesquisarTodos(): void{
    this.medicosServices.getAll().subscribe({
      next: (jsonMedicos: Medico[]) =>{
        this.Medicos = jsonMedicos;
        if (this.Medicos.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  pesquisarPorId(): void{
    this.medicosServices.getById(Number(this.Id)).subscribe({
      next:(jsonMedicos: Medico) => {
        this.Medicos = [jsonMedicos];
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  pesquisarPorCrm(): void {
    this.medicosServices.getByCrm(String(this.CRM)).subscribe({
      next: (jsonMedicos: Medico) => {
        this.Medicos = [jsonMedicos];
        if (this.Medicos.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  pesquisarPorNome(): void {
    this.medicosServices.getByNome(String(this.Nome)).subscribe({
      next:(jsonMedicos: Medico[]) => {
        this.Medicos = jsonMedicos;
        if (this.Medicos.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  exibirMensagemErro(status:number): void{
    if (status === 404)
      this.exibirMensagem('Nenhum médico encontrado')
    else if (status === 500)
      this.exibirMensagem('Erro interno do servidor')
    else if (status === 0)
      this.exibirMensagem('Falha na requisição\nEntre em contato com o suporte.')
  }

  exibirMensagem(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent,
      {data:{mensagem:msg}});
  }
}
