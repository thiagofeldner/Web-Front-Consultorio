import { Component } from '@angular/core';
import { Paciente } from '../../../models/model.paciente';
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';


@Component({
  selector: 'app-paciente-index',
  templateUrl: './paciente-index.component.html',
  styleUrl: './paciente-index.component.css'
})
export class PacienteIndexComponent {
  Pacientes!:Paciente[];
  Codigo:string;
  Nome:string;
  DataNascimento: string;

  displayedColumns: string[] = ['Codigo', 'Nome', 'DataNascimento'];

  constructor(private pacientesService:PacientesService, private dialog:MatDialog){
    this.Pacientes = [];
    this.Codigo = '';
    this.Nome ='';
    this.DataNascimento = '';
  }

  definirPesquisa(): void{
    this.Pacientes = [];

    if(this.Codigo || this.Codigo == '0'){
      this.pesquisarPorCodigo();
      return;
    }

    if(this.Nome){
      this.pesquisarPorNome();
      return;
    }

    this.pesquisarTodos();
  }

  pesquisarTodos(): void{
    this.pacientesService.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonPacientes:Paciente[])=>{
        this.Pacientes = jsonPacientes;
        if (this.Pacientes.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  pesquisarPorCodigo(): void{
    this.pacientesService.getByCodigo(Number(this.Codigo))
    .pipe(take(1))
    .subscribe({
      next: (jsonPaciente:Paciente)=>{
        this.Pacientes = [jsonPaciente];
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    });
  }

  pesquisarPorNome(): void{
    this.pacientesService.getByNome(String(this.Nome))
    .pipe(take(1))
    .subscribe({
      next: (jsonPaciente:Paciente[])=>{
        this.Pacientes = jsonPaciente;
        if (this.Pacientes.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  exibirMensagemErro(status:number): void{
    if (status === 404)
      this.exibirMensagem('Nenhum paciente encontrado')
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
