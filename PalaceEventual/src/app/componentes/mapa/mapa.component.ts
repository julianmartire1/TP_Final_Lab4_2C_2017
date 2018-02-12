import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DirectionsRenderer } from '@ngui/map';

import { FormControl } from '@angular/forms/src/model';
declare var $: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
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

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      this.direction.origin = position.coords.latitude + ',' + position.coords.longitude;
      console.log(this.direction.origin);
    });
  }

  mapear() {
    this.direction.origin = this.desde;
    this.direction.destination = this.hasta;
    this.direction.travelMode = this.viaje;
    this.showDirection();
  }

  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    this.cdr.detectChanges();
  }

  showDirection() {
    this.directionsRendererDirective['showDirections'](this.direction);
  }

}
