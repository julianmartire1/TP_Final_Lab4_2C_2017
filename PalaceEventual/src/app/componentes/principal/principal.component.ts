import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MihttpService } from '../../services/mi-http.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuario : string;
  tipoDeUsuario : any;
  constructor(public router : Router,public miHttp : MihttpService) { 
    this.usuario = localStorage.getItem("usuario");
    this.tipoDeUsuario = localStorage.getItem("tipo");
  }

  cerrarSesion()
  {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    this.router.navigate(["/Login"]);
  }

  reservar()
  {
    this.router.navigate(["/Reservar"]);
  }

  misReservas()
  {
    this.router.navigate(["/Reservas"]);
  }

  ngOnInit() {
    
  }

}
