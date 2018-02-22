import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }
  
  reservar()
  {
    this.router.navigate(["/Reservar"]);
  }

  invitado()
  {
    this.router.navigate(["/Invitado"]);
  }

  Iniciar(){
    this.router.navigate(["/Login"]);
  }
}
