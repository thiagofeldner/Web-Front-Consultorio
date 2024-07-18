import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MedicamentoIndexComponent } from './pages/medicamentos/medicamento-index/medicamento-index.component';
import { MedicamentoCreateComponent } from './pages/medicamentos/medicamento-create/medicamento-create.component';
import { MedicamentoEditComponent } from './pages/medicamentos/medicamento-edit/medicamento-edit.component';
import { Mensagem404Component } from './pages/mensagens/mensagem404/mensagem404.component';
import { PacienteIndexComponent } from './pages/pacientes/paciente-index/paciente-index.component';
import { PacienteCreateComponent } from './pages/pacientes/paciente-create/paciente-create.component';
import { PacienteEditComponent } from './pages/pacientes/paciente-edit/paciente-edit.component';
import { MedicosIndexComponent } from './pages/medicos/medicos-index/medicos-index.component';
import { MedicosCreateComponent } from './pages/medicos/medicos-create/medicos-create.component';
import { MedicosEditComponent } from './pages/medicos/medicos-edit/medicos-edit.component';
import { UsuariosIndexComponent } from './pages/usuarios/usuarios-index/usuarios-index.component';
import { UsuariosCreateComponent } from './pages/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from './pages/usuarios/usuarios-edit/usuarios-edit.component';
import { LoginIndexComponent } from './pages/login/login-index/login-index.component';
import { LoginCreateComponent } from './pages/login/login-create/login-create.component';
import { PrincipalComponent } from './pages/principal/principal/principal.component';
import { usuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { LogoutComponent } from './pages/logout/logout/logout.component';

const routes: Routes = [

  //Login
  { path: 'login', component: LoginIndexComponent},

  //Login Create
  { path: 'login/create', component: LoginCreateComponent },

  {
    path: '', component: PrincipalComponent, canActivate:[usuarioAutenticadoGuard],
    children: [
      { path: '', redirectTo:'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent,},

      //Medicamentos
      { path: 'medicamentos', component: MedicamentoIndexComponent },
      { path: 'medicamentos/create', component: MedicamentoCreateComponent },
      { path: 'medicamentos/edit/:id', component: MedicamentoEditComponent },

      //Pacientes
      { path: 'pacientes', component: PacienteIndexComponent },
      { path: 'pacientes/create', component: PacienteCreateComponent },
      { path: 'pacientes/edit/:codigo', component: PacienteEditComponent },

      //Médicos
      { path: 'medicos', component: MedicosIndexComponent },
      { path: 'medicos/create', component: MedicosCreateComponent },
      { path: 'medicos/edit/:id', component: MedicosEditComponent },

      //usuarios
      { path: 'usuarios', component: UsuariosIndexComponent },
      { path: 'usuarios/create', component: UsuariosCreateComponent },
      { path: 'usuarios/edit/:id', component: UsuariosEditComponent },

      //logout
      { path: 'logout', component: LogoutComponent },

      //Sem rota
      { path: '**', component: Mensagem404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
