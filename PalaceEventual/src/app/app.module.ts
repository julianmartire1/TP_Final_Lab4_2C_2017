import { ReservarComponent } from './componentes/reservar/reservar.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RouterModule, Routes , Router, ActivatedRoute } from '@angular/router';
import { MihttpService } from './services/mi-http.service';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ListadoInvitadosComponent } from './componentes/listado-invitados/listado-invitados.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import swal from 'sweetalert';
import { MenuComponent } from './componentes/menu/menu.component';
import { VerificarService } from './services/verificar.service';
import { MapaComponent } from './componentes/mapa/mapa.component';

import { NguiMapModule} from '@ngui/map';
import { Location, LocationStrategy } from '@angular/common';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { EncuestasComponent } from './componentes/encuestas/encuestas.component';
import { ChartsModule } from 'ng2-charts';
import { RecaptchaModule } from 'ng2-recaptcha';
import { MapaInvitadoComponent } from './componentes/mapa-invitado/mapa-invitado.component';

const appRoutes: Routes = [
  //{ path: 'pagina1' , component: Pagina1Component , canActivate: [VerificarJWTService] },
  //{ path: 'pagina2' , component: Pagina2Component , canActivate: [VerificarJwtAdminService] },
  { path: 'Login', component: LoginComponent },
  { path: 'Registrar', component: RegistrarComponent },
  { path: 'Principal', component: PrincipalComponent ,canActivate: [VerificarService]},
  { path: 'Reservar', component: ReservarComponent,canActivate: [VerificarService] },
  { path: 'Reservas', component: ReservasComponent,canActivate: [VerificarService] },
  { path: 'Encuestas', component: EncuestasComponent,canActivate: [VerificarService] },
  { path: 'Invitado', component: MapaInvitadoComponent },
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
    MenuComponent,
    MapaComponent,
    SpinnerComponent,
    EncuestasComponent,
    MapaInvitadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RecaptchaModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBUHx4bqg1yVT_KgjnLbeqlD40DUGSw57Q'}),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MihttpService,VerificarService,Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
