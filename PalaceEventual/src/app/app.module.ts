import { ReservarComponent } from './componentes/reservar/reservar.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RouterModule, Routes } from '@angular/router';
import { MihttpService } from './services/mi-http.service';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ListadoInvitadosComponent } from './componentes/listado-invitados/listado-invitados.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import swal from 'sweetalert';
import { MenuComponent } from './componentes/menu/menu.component';
import { VerificarService } from './services/verificar.service';

const appRoutes: Routes = [
  //{ path: 'pagina1' , component: Pagina1Component , canActivate: [VerificarJWTService] },
  //{ path: 'pagina2' , component: Pagina2Component , canActivate: [VerificarJwtAdminService] },
  { path: 'Login', component: LoginComponent },
  { path: 'Registrar', component: RegistrarComponent },
  { path: 'Principal', component: PrincipalComponent ,canActivate: [VerificarService]},
  { path: 'Reservar', component: ReservarComponent,canActivate: [VerificarService] },
  { path: 'Reservas', component: ReservasComponent,canActivate: [VerificarService] },
  { path: '',   redirectTo: '/Login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
  
  //{ path: '',   redirectTo: '/pagina1', pathMatch: 'full' },
  //
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegistrarComponent,
    ErrorComponent,
    ReservarComponent,
    ListadoInvitadosComponent,
    ReservasComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MihttpService,VerificarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
