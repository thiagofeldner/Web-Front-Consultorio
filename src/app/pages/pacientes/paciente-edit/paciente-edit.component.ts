import { Component } from '@angular/core';
import { Paciente } from '../../../models/model.paciente';
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-paciente-edit',
  templateUrl: './paciente-edit.component.html',
  styleUrl: './paciente-edit.component.css'
})
export class PacienteEditComponent {
  Paciente:Paciente;

  constructor(private pacientesService:PacientesService, private activateRoute:ActivatedRoute,
    private router:Router, private dialog:MatDialog
  ){
    this.Paciente = new Paciente();

    const codigo = this.activateRoute.snapshot.paramMap.get('codigo');

    this.pacientesService.getByCodigo(Number(codigo))
    .pipe(take(1))
    .subscribe({
      next: (paciente:Paciente)=>{
        this.Paciente = paciente;
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  enviar():void{
    if(this.validarDados()){
      this.pacientesService.put(this.Paciente)
      .pipe(take(1))
      .subscribe({
        next: (paciente:Paciente)=>{
          this.exibirMensagemRedirecionar(`Paciente ${this.Paciente.Nome} alterado com sucesso`);
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        }
      });
    }
  }

  validarDados(): boolean{
    let msg: string = '';

    if(this.Paciente.Nome === '')
      msg += 'Nome;\n';

    if(this.Paciente.DataNascimento.toString() === '')
      msg += 'Data de Nascimento;\n';

    if(msg){
      msg = 'Verifique os seguintes dados:\n'+msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;

  }

  exibirMensagemErro(status:number): void{
    if (status === 400)
      this.exibirMensagem('Verifique os dados enviados.');
    else if (status === 404)
      this.exibirMensagemRedirecionar('Nenhum paciente encontrado');
    else if (status === 500)
      this.exibirMensagem('Erro interno do servidor');
    else if (status === 0)
      this.exibirMensagem('Falha na requisição\nEntre em contato com o suporte.');
  }

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent,
      {data:{mensagem:msg}});

    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe(() => {
      this.router.navigate(['/pacientes']);
    });
  }

  exibirMensagem(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent,
      {data:{mensagem:msg}});
  }



  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent,
      {data:{mensagem:`Deseja excluir o paciente ${this.Paciente.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.pacientesService.delete(this.Paciente.Codigo)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Paciente ${this.Paciente.Nome} excluído com sucesso`);
          },
          error: (jsonErro: any) => {
            this.exibirMensagemErro(jsonErro.status);
          }
        });
      }
    });
  }
}
