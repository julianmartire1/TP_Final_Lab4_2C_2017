import { Component, OnInit, Output } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  reserva : any = {};
  otrareserva : any = {};
  arrayMesa1: Array<any>;
  arrayMesa2: Array<any>;
  local : string = "";
  mesa;
  invitado;
  bandera=false;
  fecha : string = "";
  listado=false;
  constructor(public mihttp : MihttpService,public miRouter : Router) {
    this.arrayMesa1 = new Array<any>();
    this.arrayMesa2 = new Array<any>();
  }

  agregar() {
    this.bandera=true;
    if (this.mesa == 1) {
      if (this.arrayMesa1.length < 10)
        this.arrayMesa1.push({ invitado: this.invitado });
      else alert("no puede agregar mas de 10 en una mesa");
    }
    if (this.mesa == 2) {
      if (this.arrayMesa2.length < 10)
        this.arrayMesa2.push({ invitado: this.invitado });
      else alert("no puede agregar mas de 10 en una mesa");
    }

    this.reservar();

    this.invitado = '';
    this.mesa = '';
    this.listado=true;
    //console.log("MESA 1", this.arrayMesa1);
    //console.log("MESA 2", this.arrayMesa2);
  }

  reservar() {
    //let reserva: any = {};
    this.reserva.cliente = localStorage.getItem("usuario");
    this.reserva.local = this.local;
    this.reserva.fecha = this.fecha;
    this.reserva.mesas = { "mesa1":this.arrayMesa1,"mesa2":this.arrayMesa2};
    this.otrareserva.mesa1=this.arrayMesa1;
    this.otrareserva.mesa2=this.arrayMesa2;
    this.reserva.con = true;
    console.log("DESDE TS",this.reserva);
  }

  guardarReserva()
  {/*
    console.log("RESERVAS",this.reserva);
    return;/*/
    this.reserva.cliente = localStorage.getItem("usuario");
    this.reserva.local = this.local;
    this.reserva.fecha = this.fecha;
    if(this.bandera==false)
      this.reserva.con = false;

    if(this.reserva.mesas == null)
    {
      this.reserva.mesas=null;
    }

    let obj = { "reserva": this.reserva };
    this.mihttp.reservar(obj,"http://localhost/servidor/BackEnd-PHP-jwt/api/reservar/")
    .then(res => {
      console.log("DESDE API",res);
      alert(res["RESULTADO"]);
      this.miRouter.navigate(["/Principal"]);
    })
    .catch(err => console.log(err));
  }

  ngOnInit() {
  }

}
