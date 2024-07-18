import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentosService } from '../../../services/medicamentos/medicamentos.service';
import { Medicamento } from '../../../models/model.medicamento';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-medicamento-edit',
  templateUrl: './medicamento-edit.component.html',
  styleUrl: './medicamento-edit.component.css'
})
export class MedicamentoEditComponent {

  Medicamento!: Medicamento;

  constructor(
    private activatedRoute:ActivatedRoute,
    private medicamentosService: MedicamentosService,
    private router: Router,
    private dialog: MatDialog
  ){

    this.Medicamento = new Medicamento();

    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.medicamentosService.getById(Number(id)).subscribe({
      next: (jsonMedicamento:Medicamento) => {
        this.Medicamento = jsonMedicamento;
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
        this.router.navigate(['/medicamentos']);
      }
    });
  }

  alterar(): void{
    if (this.validarDadosExibirMensagem()){
      this.medicamentosService.put(this.Medicamento).subscribe({
        next: (jsonMedicamento:Medicamento) => {
          this.exibirMensagemRedirecionar('Medicamento alterado com sucesso');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);

        }
      });
    }
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent,
      {data:{mensagem:`Deseja excluir o medicamento ${this.Medicamento.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.medicamentosService.delete(this.Medicamento.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Medicamento ${this.Medicamento.Nome} excluído com sucesso`);
          },
          error: (jsonErro: any) => {
            this.exibirMensagemErro(jsonErro.status);
          }
        });
      }
    });
  }

  exibirMensagemRedirecionar(msg: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensagem: msg },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/medicamentos']);
    });
  }

  exibirMensagem(msg: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensagem: msg },
    });
  }

  exibirMensagemErro(status: number): void {
    if (status === 0)
      this.exibirMensagemRedirecionar(
        'Falha na requisição.\nEntre em contato com o suporte!'
      );
    else if (status === 400)
      this.exibirMensagem('Verifique os dados que estão sendo enviados!');
    else if (status === 404)
      this.exibirMensagem('Nenhum medicamento foi encontrado! Alguém excluiu esse usuário.');
    else if (status === 500)
      this.exibirMensagem(
        'Erro interno no servidor!\nEntre em contato com o suporte!'
      );
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (this.Medicamento.Nome === '') {
        msg += 'Nome;\n';
    }

    if (this.Medicamento.DataFabricacao.toString() === '') {
        msg += 'Data de fabricação;\n';
    }

    if (this.Medicamento.DataVencimento !== null
        && this.Medicamento.DataVencimento?.toString() !== ''
        && this.Medicamento.DataVencimento <= this.Medicamento.DataFabricacao) {
        msg += 'Data de fabricação não pode ser maior ou igual a data de vencimento.';
    }

    if (msg !== '') {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        this.exibirMensagem(msg);
        return false;
    }
    return true;
  }
}
