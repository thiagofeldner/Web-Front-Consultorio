import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { ContainerComponent } from './shared/container/container.component';
import { Mensagem404Component } from './pages/mensagens/mensagem404/mensagem404.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { BtnEnviarComponent } from './shared/button/btn-enviar/btn-enviar.component';
import { BtnLimparComponent } from './shared/button/btn-limpar/btn-limpar.component';
import { BtnVoltarComponent } from './shared/button/btn-voltar/btn-voltar.component';
import { BtnExcluirComponent } from './shared/button/btn-excluir/btn-excluir.component';
import { BtnAlterarComponent } from './shared/button/btn-alterar/btn-alterar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatToolbar } from '@angular/material/toolbar';

import { MedicamentoIndexComponent } from './pages/medicamentos/medicamento-index/medicamento-index.component';
import { MedicamentoEditComponent } from './pages/medicamentos/medicamento-edit/medicamento-edit.component';
import { MedicamentoCreateComponent } from './pages/medicamentos/medicamento-create/medicamento-create.component';

import { PacienteIndexComponent } from './pages/pacientes/paciente-index/paciente-index.component';
import { PacienteCreateComponent } from './pages/pacientes/paciente-create/paciente-create.component';
import { PacienteEditComponent } from './pages/pacientes/paciente-edit/paciente-edit.component';

import { MedicosIndexComponent } from './pages/medicos/medicos-index/medicos-index.component';
import { MedicosEditComponent } from './pages/medicos/medicos-edit/medicos-edit.component';
import { MedicosCreateComponent } from './pages/medicos/medicos-create/medicos-create.component';

import { UsuariosIndexComponent } from './pages/usuarios/usuarios-index/usuarios-index.component';
import { UsuariosCreateComponent } from './pages/usuarios/usuarios-create/usuarios-create.component';
import { UsuariosEditComponent } from './pages/usuarios/usuarios-edit/usuarios-edit.component';

import { LoginIndexComponent } from './pages/login/login-index/login-index.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';

import { LoginCreateComponent } from './pages/login/login-create/login-create.component';
import { UserComponent } from './shared/user/user/user.component';
import { PrincipalComponent } from './pages/principal/principal/principal.component';
import { LogoutComponent } from './pages/logout/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    MedicamentoIndexComponent,
    MedicamentoEditComponent,
    MedicamentoCreateComponent,
    Mensagem404Component,
    PacienteIndexComponent,
    PacienteCreateComponent,
    PacienteEditComponent,
    MedicosIndexComponent,
    MedicosEditComponent,
    MedicosCreateComponent,
    AlertComponent,
    ConfirmComponent,
    BtnEnviarComponent,
    BtnLimparComponent,
    BtnVoltarComponent,
    BtnExcluirComponent,
    BtnAlterarComponent,
    UsuariosIndexComponent,
    UsuariosCreateComponent,
    UsuariosEditComponent,
    LoginIndexComponent,
    LoginCreateComponent,
    UserComponent,
    PrincipalComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatToolbar,
    MatIcon,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardActions,
    MatCardTitle,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideNativeDateAdapter(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
