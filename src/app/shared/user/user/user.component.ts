import { Component } from '@angular/core';
import { Usuario } from '../../../models/model.usuario';
import { AutenticarService } from '../../../services/autenticar/autenticar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  Usuario: Usuario;

  constructor(private autenticarService: AutenticarService){
    this.Usuario = autenticarService.obterUsuarioAutenticado();
  }
}
