import { Component, OnInit, Output } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  reserva: any = {};
  otrareserva: any = {};
  arrayMesa1: Array<any>;
  arrayMesa2: Array<any>;
  arrayMesa8: Array<any>;
  arrayMesa3: Array<any>;
  arrayMesa4: Array<any>;
  arrayMesa5: Array<any>;
  arrayMesa6: Array<any>;
  arrayMesa7: Array<any>;
  arrayMesa10: Array<any>;
  arrayMesa9: Array<any>;
  local: string = "";
  mesa: any = "";
  invitado = "";
  bandera = false;
  fecha: string = "";
  listado = false;
  resuelto;
  spinner: boolean = false;

  constructor(public mihttp: MihttpService, public miRouter: Router) {
    this.arrayMesa1 = new Array<any>();
    this.arrayMesa2 = new Array<any>();
    this.arrayMesa3 = new Array<any>();
    this.arrayMesa4 = new Array<any>();
    this.arrayMesa5 = new Array<any>();
    this.arrayMesa6 = new Array<any>();
    this.arrayMesa7 = new Array<any>();
    this.arrayMesa8 = new Array<any>();
    this.arrayMesa9 = new Array<any>();
    this.arrayMesa10 = new Array<any>();
    this.spinner = true;
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    if (captchaResponse != null)
      this.resuelto = true;
    else this.resuelto = false;
  }

  agregar() {
    this.bandera = true;
    switch (this.mesa) {
      case "1":
        if (this.arrayMesa1.length < 10)
          this.arrayMesa1.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "2":
        if (this.arrayMesa2.length < 10)
          this.arrayMesa2.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "3":
        if (this.arrayMesa3.length < 10)
          this.arrayMesa3.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "4":
        if (this.arrayMesa4.length < 10)
          this.arrayMesa4.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "5":
        if (this.arrayMesa5.length < 10)
          this.arrayMesa5.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "6":
        if (this.arrayMesa6.length < 10)
          this.arrayMesa6.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "7":
        if (this.arrayMesa7.length < 10)
          this.arrayMesa7.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "8":
        if (this.arrayMesa8.length < 10)
          this.arrayMesa8.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "9":
        if (this.arrayMesa9.length < 10)
          this.arrayMesa9.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      case "10":
        if (this.arrayMesa10.length < 10)
          this.arrayMesa10.push({ invitado: this.invitado });
        else
          alert("no puede agregar mas de 10 en una mesa");
        break;
      default:
        break;
    }

    this.reservar();

    this.invitado = '';
    this.mesa = '';
    this.listado = true;
    //console.log("MESA 1", this.arrayMesa1);
    //console.log("MESA 2", this.arrayMesa2);
  }

  reservar() {
    //let reserva: any = {};
    this.reserva.cliente = localStorage.getItem("usuario");
    this.reserva.local = this.local;
    this.reserva.fecha = this.fecha;
    this.reserva.mesas = { "mesa1": this.arrayMesa1, "mesa2": this.arrayMesa2, "mesa3": this.arrayMesa3, "mesa4": this.arrayMesa4, "mesa5": this.arrayMesa5, "mesa6": this.arrayMesa6, "mesa7": this.arrayMesa7, "mesa8": this.arrayMesa8, "mesa9": this.arrayMesa9, "mesa10": this.arrayMesa10 };
    this.otrareserva.mesa1 = this.arrayMesa1;
    this.otrareserva.mesa2 = this.arrayMesa2;
    this.otrareserva.mesa3 = this.arrayMesa3;
    this.otrareserva.mesa4 = this.arrayMesa4;
    this.otrareserva.mesa5 = this.arrayMesa5;
    this.otrareserva.mesa6 = this.arrayMesa6;
    this.otrareserva.mesa7 = this.arrayMesa7;
    this.otrareserva.mesa8 = this.arrayMesa8;
    this.otrareserva.mesa9 = this.arrayMesa9;
    this.otrareserva.mesa10 = this.arrayMesa10;
    this.reserva.con = true;
    console.log("DESDE TS", this.reserva);
  }

  guardarReserva() {/*
    console.log("RESERVAS",this.reserva);
    return;/*/
    this.spinner = false;
    this.reserva.cliente = localStorage.getItem("usuario");
    this.reserva.local = this.local;
    this.reserva.fecha = this.fecha;
    if (this.bandera == false)
      this.reserva.con = false;

    if (this.reserva.mesas == null) {
      this.reserva.mesas = null;
    }

    let obj = { "reserva": this.reserva };
    this.mihttp.reservar(obj, "/reservar/")
      .then(res => {
        this.spinner = true;
        console.log("DESDE API", res);
        alert(res["RESULTADO"]);
        this.miRouter.navigate(["/Principal"]);
      })
      .catch(err => console.log(err));
  }

  ngOnInit() {
  }

}
