import { Component, OnInit } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reserva: any;
  local: any;
  fechas: any;
  array = ["1", "2", "3", "4", "5"];
  fechaHoy: any;
  buscar;
  bandera=false;
  invitado="";
  mesa="";
  constructor(public mihttp: MihttpService) {
  }

  agregarInvitado()
  {
    let obj={
      invitado : this.invitado,
      mesa : this.mesa,
      idReserva: this.buscar
    };

    this.mihttp.eliminarInvitado(obj, "http://localhost/servidor/BackEnd-PHP-jwt/api/agregarInvitado/")
    .then(data => {
      console.log(data);
      this.listado();
    })
    .catch(err => console.log(err));
  }

  eliminar(obj : string)
  {
    let otro = {
      invitado: obj
    };
    this.mihttp.eliminarInvitado(otro, "http://localhost/servidor/BackEnd-PHP-jwt/api/eliminarInvitado/")
      .then(data => {
        console.log(data);
        this.listado();
      })
      .catch(err => console.log(err));
  }

  listado() {
    this.bandera=false;
    let cliente = localStorage.getItem("usuario");
    let obj = {
      fecha: this.buscar,
      cliente: cliente
    };
    console.log(obj);
    this.mihttp.reservasCliente(obj, "http://localhost/servidor/BackEnd-PHP-jwt/api/reservaCliente/")
    .then(data => {
      console.log(data);
      this.reserva = data["Reserva"];
      this.bandera=true;
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {

    let cliente = localStorage.getItem("usuario");
    let obj = {
      cliente: cliente
    };
    this.mihttp.reservasCliente(obj, "http://localhost/servidor/BackEnd-PHP-jwt/api/fechaReservaCliente/")
      .then(data => {
        console.log(data);
        this.fechas = data["FECHA"];
      })
      .catch(err => console.log(err));

  }

}
