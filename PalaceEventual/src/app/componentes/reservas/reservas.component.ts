import { Component, OnInit } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';
import { Router } from '@angular/router';
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
  buscar = "";
  bandera=false;
  invitado="";
  mesa="";
  modalInvitado = {};
  invitadoModificado ="";
  mesaModificado="";
  tipo;
  constructor(public mihttp: MihttpService,public miRouter : Router) {
    this.tipo = localStorage.getItem("tipo");
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
    let tipo = localStorage.getItem("tipo");
    if(tipo == "encargado" || tipo == "empleado")
    {
      let cliente = localStorage.getItem("usuario");
      let obj = {
        fecha: this.buscar
      };
      //console.log(obj);
      this.mihttp.reservasCliente(obj, "http://localhost/servidor/BackEnd-PHP-jwt/api/reservaEncargado/")
      .then(data => {
        //console.log(data);
        this.reserva = data["Reserva"];
        this.bandera=true;
      })
      .catch(err => console.log(err));
    }
    if(tipo == "cliente")
    {
      let cliente = localStorage.getItem("usuario");
      let obj = {
        fecha: this.buscar,
        cliente: cliente
      };
      //console.log(obj);
      this.mihttp.reservasCliente(obj, "http://localhost/servidor/BackEnd-PHP-jwt/api/reservaCliente/")
      .then(data => {
        //console.log(data);
        this.reserva = data["Reserva"];
        this.bandera=true;
      })
      .catch(err => console.log(err));
    }
    
  }

  modal(obj : any)
  {
    this.modalInvitado=obj;
  }

  modificarInvitado(id)
  {
    let obj = {
      id: id,
      invitado: this.invitadoModificado,
      mesa: this.mesaModificado
    };

    this.mihttp.modificarInvitado(obj, "http://localhost/servidor/BackEnd-PHP-jwt/api/modificarInvitado/")
    .then(data => {
      console.log(data);
      this.listado();
    })
    .catch(err => console.log(err));

  }

  cancelarReserva()
  {
    let obj = {
      idReserva : this.buscar
    };
    //console.log(obj);
    //return;
    this.mihttp.httpDeletePromise("http://localhost/servidor/BackEnd-PHP-jwt/api/eliminarReserva/",obj)
    .then(res => {
      let respuesta = res["Eliminada"];
      if(respuesta == "true")
      {
        alert("Reserva eliminada");
        this.miRouter.navigate(["/Principal"]);
      }        
      else 
        alert("No se pudo eliminar la reserva");
    })
    .catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {

    let tipo = localStorage.getItem("tipo");
    if(tipo == "encargado" || tipo == "empleado")
    {
      this.mihttp.traerTodasLasReservas("http://localhost/servidor/BackEnd-PHP-jwt/api/traerTodasLasReservas/")
        .then(data => {
          console.log(data);
          this.fechas = data["FECHA"];
        })
        .catch(err => console.log(err));
    }
    if(tipo == "cliente")
    {
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

}
