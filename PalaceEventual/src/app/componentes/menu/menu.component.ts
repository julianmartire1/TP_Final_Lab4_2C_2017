import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
usuario;
tipoDeUsuario;
  constructor(public router : Router) { 
    this.usuario = localStorage.getItem("usuario");
    this.tipoDeUsuario = localStorage.getItem("tipo");
  }

  cerrarSesion()
  {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
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

  home()
  {
    this.router.navigate(["/Principal"]);
  }

  ngOnInit() {
  }

}
