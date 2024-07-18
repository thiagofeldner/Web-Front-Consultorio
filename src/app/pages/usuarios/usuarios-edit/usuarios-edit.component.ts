import { Component } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../models/model.usuario';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrl: './usuarios-edit.component.css',
})
export class UsuariosEditComponent {
  Usuario: Usuario;
  ConfirmarSenha: string;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.Usuario = new Usuario();
    this.ConfirmarSenha = '';

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.usuarioService.getById(Number(id)).subscribe({
      next: (usuario: Usuario) => {
        this.Usuario = usuario;
      },
      error: (jsonErro: any) => {
        this.exibirMensagemErro(jsonErro.status);
        this.router.navigate(['/usuarios']);
      }
    });
  }

  alterar(): void{
    if(this.validarDadosExibirMensagem()){
      this.usuarioService.put(this.Usuario).subscribe({
        next: (usuario: Usuario) => {
          this.exibirMensagemRedirecionar('Usuário alterado com sucesso!');
        },
        error: (jsonErro: any) => {
          this.exibirMensagemErro(jsonErro.status);
        }
      });
    }
  }

  desejaExcluir():void{
    const dialogRef = this.dialog.open(ConfirmComponent,
      {data:{mensagem:`Deseja excluir o usuário ${this.Usuario.Nome}?`}});

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result){
        this.usuarioService.delete(this.Usuario.Id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.exibirMensagemRedirecionar(`Usuário ${this.Usuario.Nome} excluído com sucesso`);
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

    if(this.Usuario.Nome === '')
      msg += 'Nome;\n';

    if(this.Usuario.Email === '')
      msg += 'Email;\n';

    if(this.Usuario.Senha === '')
      msg += 'Senha;\n';

    if(this.ConfirmarSenha != this.Usuario.Senha)
      msg += 'Senhas não conferem!\nVerificar senhas digitadas!';

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
      this.router.navigate(['/usuarios']);
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
        'Nenhum usuário foi encontrado! Alguém excluiu esse usuário.'
      );
    else if (status === 500)
      this.exibirMensagem(
        'Erro interno no servidor!\nEntre em contato com o suporte!'
      );
  }
}
