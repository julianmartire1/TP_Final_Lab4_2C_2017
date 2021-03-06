import { Component, OnInit, ViewChild, ChangeDetectorRef,Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DirectionsRenderer } from '@ngui/map';

import { FormControl } from '@angular/forms/src/model';
import { MihttpService } from '../../services/mi-http.service';
declare var $: any;

@Component({
  selector: 'app-mapa-invitado',
  templateUrl: './mapa-invitado.component.html',
  styleUrls: ['./mapa-invitado.component.css']
})
export class MapaInvitadoComponent implements OnInit {
  
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  @Input() local;
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;
  direction: any = {
    origin: '',
    destination: '',
    travelMode: 'WALKING'
  };
  desde = "";
  hasta = "";
  viaje = "WALKING";
  numeroF = 0;
  spinner=false;
  constructor(private cdr: ChangeDetectorRef,public servicio : MihttpService) {
  }

  numeroFiesta()
  {
    let obj={
      numero : this.numeroF
    };
    this.servicio.post(obj,"/numeroFiesta/")
    .then( data => {
      this.spinner=true;
      if(data["Local"].length > 0 )
      {
        console.log(data["Local"][0]["local"]);
        if(data["Local"][0]["local"] == "Quilmes")
          this.local="-34.720657,-58.254600";
        if(data["Local"][0]["local"] == "Berazategui")
          this.local="-34.759160,-58.205168";
        if(data["Local"][0]["local"] == "Avellaneda")
          this.local="-34.693013,-58.331757";
        this.mapear();
      }
      else alert("Numero invalido");
    })
    .catch( err => {
      this.spinner=true;
      console.log(err);
    });
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.direction.origin = position.coords.latitude + ',' + position.coords.longitude;
      console.log(this.direction.origin);
    });

    this.directionsRendererDirective['initialized$'].subscribe(directionsRenderer => {
      this.directionsRenderer = directionsRenderer;
    });

  }

  mapear() {
    this.direction.origin = this.direction.origin;
    this.direction.destination = this.local;
    this.direction.travelMode = this.viaje;
    this.showDirection();
  }

  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    console.log(this.directionsResult);
    this.cdr.detectChanges();
  }

  showDirection() {
    this.directionsRendererDirective['showDirections'](this.direction);
  }

}
