import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Usuario } from '../../../models/model.usuario';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrl: './usuarios-create.component.css',
})
export class UsuariosCreateComponent {
  Usuario: Usuario;
  ConfirmarSenha: string;

  constructor(
    private usuariosServices: UsuariosService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.Usuario = new Usuario();
    this.ConfirmarSenha = '';
  }

  enviar(): void {
    if (this.validarDadosExibirMensagem()) {
      this.usuariosServices.post(this.Usuario).subscribe({
        next: (jsonUsuario: Usuario) => {
          this.exibirMensagemRedirecionar('Usuário cadastrado com sucesso!');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        },
      });
    }
  }

  validarDadosExibirMensagem(): boolean {
    let msg: string = '';

    if (this.Usuario.Nome === '')
      msg += 'Nome;\n';

    if (this.Usuario.Email === '')
      msg += 'Email;\n';

    if (this.Usuario.Senha === '')
      msg += 'Senha;\n';

    if (this.ConfirmarSenha === '')
      msg += 'Confirmar Senha;\n';

    if (this.ConfirmarSenha != this.Usuario.Senha)
      msg += 'Senhas não conferem!\nVerificar senhas digitadas!';

    if (msg !== '') {
      msg = 'Verifique os seguintes dados:\n' + msg;
      this.exibirMensagem(msg);
      return false;
    }
    return true;
  }

  exibirMensagemRedirecionar(msg: string): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensagem: msg },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['']);
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
      this.exibirMensagem(
        'Nenhum usuário foi encontrado! Alguém excluiu esse usuário.'
      );
    else if (status === 500)
      this.exibirMensagem(
        'Erro interno no servidor!\nEntre em contato com o suporte!'
      );
  }
}
