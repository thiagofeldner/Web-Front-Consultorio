import { Component } from '@angular/core';
import { Medico } from '../../../models/model.medicos';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-medicos-create',
  templateUrl: './medicos-create.component.html',
  styleUrl: './medicos-create.component.css',
})
export class MedicosCreateComponent {
  Medico: Medico;

  constructor(
    private medicosService: MedicosService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.Medico = new Medico();
  }

  enviar() :void{
    if(this.validarDadosExibirMensagem()){
      this.medicosService.post(this.Medico).subscribe({
        next:(jsonMedico: Medico) => {
          this.Medico = jsonMedico;
          this.exibirMensagemRedirecionar('Médico cadastrado com sucesso!');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        }
      });
    }
  }

  validarDadosExibirMensagem(): boolean{
    let msg: string = '';

    if(this.Medico.CRM === '')
      msg += 'Crm;\n';

    if(this.Medico.Nome === '')
      msg += 'Nome;\n';

    if(msg !== ''){
      msg = 'Verifique os seguintes dados:\n'+msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;
  }

  exibirMensagemRedirecionar(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent,
      {data:{mensagem:msg}});

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/medicos']);
    });
  }

  exibirMensagem(msg:string):void{
    const dialogRef = this.dialog.open(AlertComponent,
      {data:{mensagem:msg}});
  }

  exibirMensagemErro(status: number): void {
    if (status === 0)
      this.exibirMensagemRedirecionar(
        'Falha na requisição.\nEntre em contato com o suporte!'
      );
    else if (status === 400)
      this.exibirMensagem(
        'Verifique os dados que estão sendo enviados!'
      );
    else if (status === 404)
      this.exibirMensagem(
        'Nenhum médico foi encontrado! Alguém excluiu esse médico.'
      );
    else if (status === 500)
      this.exibirMensagem(
        'Erro interno no servidor!\nEntre em contato com o suporte!'
      );
  }
}
