import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../../shared/dialogs/alert/alert.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-usuarios-index',
  templateUrl: './usuarios-index.component.html',
  styleUrl: './usuarios-index.component.css'
})
export class UsuariosIndexComponent {
  Usuarios!: Usuario[];

  Id: number | null;
  Nome: string;
  Email: string;

  displayedColumns: string[] = ['Id', 'Nome', 'Email'];

  constructor(private usuariosServices: UsuariosService, private dialog:MatDialog){
    this.Usuarios = [];
    this.Id = null;
    this.Nome = '';
    this.Email = '';
  }

  definirPesquisa(): void{
    this.Usuarios = [];

    if(this.Id || this.Id === 0){
      this.pesquisarPorId();
      return;
    }

    if(this.Nome){
      this.pesquisarPorNome();
      return;
    }

    this.pesquisarAll();
  }

  pesquisarAll() :void {
    this.usuariosServices.getAll()
    .pipe(take(1))
    .subscribe({
      next: (jsonUsuarios: Usuario[]) =>{
        this.Usuarios = jsonUsuarios;
        if (this.Usuarios.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  pesquisarPorId(): void {
    this.usuariosServices.getById(Number(this.Id)).subscribe({
      next: (jsonUsuario: Usuario) => {
        this.Usuarios = [jsonUsuario];
        if (this.Usuarios.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  pesquisarPorNome(): void {
    this.usuariosServices.getByNome(String(this.Nome)).subscribe({
      next:(jsonUsuarios: Usuario[]) => {
        this.Usuarios = jsonUsuarios;
        if (this.Usuarios.length === 0)
          this.exibirMensagemErro(404);
      },
      error: (jsonErro:any)=>{
        this.exibirMensagemErro(jsonErro.status);
      }
    })
  }

  exibirMensagemErro(status:number): void{
    if (status === 404)
      this.exibirMensagem('Nenhum usuário encontrado')
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
