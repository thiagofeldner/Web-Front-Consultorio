import { Component, OnInit } from '@angular/core';
import { Login } from '../../../models/model.login';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { AutenticarService } from '../../../services/autenticar/autenticar.service';
import { take } from 'rxjs';
import { Usuario } from '../../../models/model.usuario';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrl: './login-index.component.css',
})
export class LoginIndexComponent{
  Login: Login;
  private Usuario: Usuario;

  constructor(
    private router: Router,
    private autenticarServices: AutenticarService,
    private dialog: MatDialog
  ) {
    this.Login = new Login();
    this.Usuario = new Usuario;
  }

  submit() {
    if(this.validarDadosExibirMensagem()){
      this.autenticarServices.autenticar(this.Login)
      .pipe(take(1))
      .subscribe({
        next: (jsonUsuario: Usuario) => {
          this.Usuario = jsonUsuario;
          this.exibirMensagemRedirecionar('Usuário logado com sucesso!');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        },
      });
    }
  }

  exibirMensagemRedirecionar(msg: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensagem: msg },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  exibirMensagem(msg: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensagem: msg },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  validarDadosExibirMensagem():boolean {
    let msg:string = '';

    if (this.Login.Email === '') {
        msg += 'Email;\n';
    }

    if (this.Login.Senha === '') {
      msg += 'Senha;\n';
    }

    if (msg !== '') {
        msg = 'Preencha corretamente os dados a seguir:\n' + msg;
        this.exibirMensagem(msg);
        return false;
    }
    return true;
  }

  exibirMensagemErro(status: number): void {
    if (status === 0)
      this.exibirMensagemRedirecionar('Falha na requisição.\nEntre em contato com o suporte!');
    else if (status === 400)
      this.exibirMensagem('Verifique os dados que estão sendo enviados!');
    else if (status === 404)
      this.exibirMensagem('Usuário não cadastrado.');
    else if (status === 500)
      this.exibirMensagem('Erro interno no servidor!\nEntre em contato com o suporte!');
  }
}
