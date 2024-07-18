import { Component } from '@angular/core';
import { Paciente } from '../../../models/model.paciente';
import { PacientesService } from '../../../services/pacientes/pacientes.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrl: './paciente-create.component.css'
})
export class PacienteCreateComponent {
  Paciente:Paciente;

  constructor(private pacientesService:PacientesService, private router:Router, private dialog:MatDialog){
    this.Paciente = new Paciente();
  }

  enviar(): void{
      if(this.validarDados()){
        this.pacientesService.post(this.Paciente)
        .pipe(take(1))
        .subscribe({
          next: (jsonPaciente:Paciente)=>{
            this.exibirMensagemRedirecionar('Paciente cadastrado com sucesso.');
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

    if(msg !== ''){
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

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/pacientes']);
    });
  }

  exibirMensagem(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent,
      {data:{mensagem:msg}});
  }

}
