import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  reserva : any = {};
  arrayMesa1: Array<any>;
  arrayMesa2: Array<any>;
  local : string = "";
  mesa;
  invitado;
  fecha : string = "";
  constructor() {
    this.arrayMesa1 = new Array<any>();
    this.arrayMesa2 = new Array<any>();
  }

  agregar() {
    if (this.mesa == 1) {
      if (this.arrayMesa1.length < 2)
        this.arrayMesa1.push({ invitado: this.invitado });
      else alert("no puede agregar mas de 10 en una mesa");
    }
    if (this.mesa == 2) {
      if (this.arrayMesa2.length < 2)
        this.arrayMesa2.push({ invitado: this.invitado });
      else alert("no puede agregar mas de 10 en una mesa");
    }


    this.invitado = '';
    this.mesa = '';

    //console.log("MESA 1", this.arrayMesa1);
    //console.log("MESA 2", this.arrayMesa2);
  }

  reservar() {
    //let reserva: any = {};
    this.reserva.cliente = localStorage.getItem("usuario");
    this.reserva.local = this.local;
    this.reserva.fecha = this.fecha;
    this.reserva.mesa1 = this.arrayMesa1;
    this.reserva.mesa2 = this.arrayMesa2;

    console.log(this.reserva);
  }

  ngOnInit() {
  }

}
