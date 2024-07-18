import { Component } from '@angular/core';
import { MedicosService } from '../../../services/medicos/medicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from '../../../models/model.medicos';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-medicos-edit',
  templateUrl: './medicos-edit.component.html',
  styleUrl: './medicos-edit.component.css'
})
export class MedicosEditComponent {

  Medico: Medico;

  constructor(
    private medicoService: MedicosService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ){
    this.Medico = new Medico();

    const id: string | null = this.activatedRouter.snapshot.paramMap.get('id');

    this.medicoService.getById(Number(id)).subscribe({
      next: (jsonMedico: Medico) => {
        this.Medico = jsonMedico;
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
        this.router.navigate(['/medicos']);
      }
    });
  }

  alterar(): void{
    if(this.validarDadosExibirMensagem()){
      this.medicoService.put(this.Medico).subscribe({
        next: (jsonMedico: Medico) => {
          this.exibirMensagemRedirecionar('Médico alterado com sucesso!');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        }
      });
    }
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent,
      {data:{mensagem:`Deseja excluir o médico ${this.Medico.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.medicoService.delete(this.Medico.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Médico ${this.Medico.Nome} excluído com sucesso`);
          },
          error: (jsonErro: any) => {
            this.exibirMensagemErro(jsonErro.status);
          }
        });
      }
    });
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
