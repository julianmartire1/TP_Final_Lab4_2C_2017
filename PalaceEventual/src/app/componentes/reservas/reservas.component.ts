import { Component, OnInit } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';
import { Router } from '@angular/router';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
declare var jsPDF: any;
//declare var $: any;
import * as $ from 'jquery';
import * as autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reserva: any;
  spinner = false;
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
  nofechas=false;
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

    this.mihttp.eliminarInvitado(obj, "/agregarInvitado/")
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
    this.mihttp.eliminarInvitado(otro, "/eliminarInvitado/")
      .then(data => {
        console.log(data);
        this.listado();
      })
      .catch(err => console.log(err));
  }

  listado() {
    this.spinner=false;
    this.bandera=false;
    let tipo = localStorage.getItem("tipo");
    if(tipo == "encargado" || tipo == "empleado")
    {
      let cliente = localStorage.getItem("usuario");
      let obj = {
        fecha: this.buscar
      };
      //console.log(obj);
      this.mihttp.reservasCliente(obj, "/reservaEncargado/")
      .then(data => {
        //console.log(data);
        this.reserva = data["Reserva"];
        this.bandera=true;
        this.spinner=true;
      })
      .catch(err => {
        console.log(err)
        this.spinner=true;
      });
    }
    if(tipo == "cliente")
    {
      let cliente = localStorage.getItem("usuario");
      let obj = {
        fecha: this.buscar,
        cliente: cliente
      };
      //console.log(obj);
      this.mihttp.reservasCliente(obj, "/reservaCliente/")
      .then(data => {
        //console.log(data);
        this.reserva = data["Reserva"];
        console.log(this.reserva);
        this.bandera=true;
        this.spinner=true;
      })
      .catch(err => {
        console.log(err)
        this.spinner=true;
      });
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

    this.mihttp.modificarInvitado(obj, "/modificarInvitado/")
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
    this.mihttp.httpDeletePromise("/eliminarReserva/",obj)
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
      this.mihttp.traerTodasLasReservas("/traerTodasLasReservas/")
        .then(data => {
          this.fechas = data["FECHA"];
          console.log(this.fechas);
          if(this.fechas == null || this.fechas=="")
          {
            this.nofechas=true;
          }
          this.spinner=true;
        })
        .catch(err => {
          console.log(err)
          this.spinner=true;
        });
    }
    if(tipo == "cliente")
    {
      let cliente = localStorage.getItem("usuario");
      let obj = {
        cliente: cliente
      };
      this.mihttp.reservasCliente(obj, "/fechaReservaCliente/")
        .then(data => {
          this.fechas = data["FECHA"];
          console.log(this.fechas);
          if(this.fechas == null || this.fechas=="")
          {
            this.nofechas=true;
          }
          this.spinner=true;
        })
        .catch(err => {
          console.log(err)
          this.spinner=true;
        });
    }
    


  }

  downloadPdf() {
    var columns = [
      {title: "Numero de Invitado", dataKey: "idInvitado"},
      {title: "NOMBRE", dataKey: "nombre"},
      {title: "MESA", dataKey: "mesa"}
    ];    
    // Only pt supported (not mm or in)
    
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, this.reserva, {
      styles: {
        overflow: 'linebreak',
        fontSize: 12,
        valign: 'middle'
    },
      columnStyles: {
        id: {fillColor: [203, 208, 0]}
      },
      margin: {top: 60},
      addPageContent: function(data) {
        doc.text("Lista de Invitados", 250, 30);
      }
    });
    doc.save('listaDeInvitados.pdf');
  }

  generarCsv(){

    let data : any = [];
    console.log(data);
    for (let i = 0; i < this.reserva.length; i++) {
      let obj = {"id" : this.reserva[i].idInvitado, "nobmre" : this.reserva[i].nombre, "mesa" : this.reserva[i].mesa};
      data[i]=obj;
    }
    console.log(data);

    new Angular2Csv(data, 'lista de invitados');
  }

}
