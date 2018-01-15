import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuario : string;
  constructor(public router : Router) { 
    this.usuario = localStorage.getItem("usuario");
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
