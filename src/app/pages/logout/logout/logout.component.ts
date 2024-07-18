import { Component } from '@angular/core';
import { AutenticarService } from '../../../services/autenticar/autenticar.service';
import { Usuario } from '../../../models/model.usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent {
  Usuario: Usuario;

  constructor(
    private autenticarService: AutenticarService,
    private router: Router
  ){
    this.Usuario = autenticarService.obterUsuarioAutenticado();
  }

  ngOnInit(): void{
    if (!this.autenticarService.isAutenticado)
      this.router.navigate(['/login']);
  }

  home(){
    this.router.navigate(['/home']);
  }

  sair(){
    this.autenticarService.desautenticar();
    this.router.navigate(['/login']);
  }
}
