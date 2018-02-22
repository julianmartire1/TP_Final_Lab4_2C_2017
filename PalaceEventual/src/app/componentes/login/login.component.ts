import { Component, OnInit } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';
import { Router } from '@angular/router';
import { Cliente } from '../../clases/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario : string;
  clave : string;
  spinner = false;
  numeroF: number=0;
  local="";
  constructor(public servicio : MihttpService,public router : Router) { 
  }

  ngOnInit() {
    this.spinner=true;
    let token=localStorage.getItem("token");
    if(token != "" || token != null)
    {
      this.router.navigate(["/Principal"]);
    }
  }
  encargado()
  {
    this.usuario="encargado";
    this.clave="encargado"
  }
  empleado()
  {
    this.usuario="empleado";
    this.clave="empleado"
  }
  cliente()
  {
    this.usuario="asd";
    this.clave="123"
  }

  reservar()
  {
    this.router.navigate(["/Reservar"]);
  }

  registrar()
  {
    this.router.navigate(["/Registrar"]);
  }

  invitado()
  {
    this.router.navigate(["/Invitado"]);
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
        this.local=data["Local"][0]["local"];
      }
      else alert("Numero invalido");
    })
    .catch( err => {
      this.spinner=true;
      console.log(err);
    });
  }



  ingresar()
  {
    this.spinner=false;
    let cliente : Cliente = new Cliente(this.usuario,this.clave);
    let obj = {
      usuario : cliente.usuario,
      clave : cliente.clave
    };

    this.servicio.post(obj,"/ingreso/")
    .then( data => {
      this.spinner=true;
      console.log(data);
      if(data["bandera"] == true)
      {
        localStorage.setItem("token",data["token"]);
        localStorage.setItem("usuario",data["datos"]["usuario"]);
        localStorage.setItem("tipo",data["datos"]["tipo"]);
        this.router.navigate(["/Principal"]);
      }
      else
        alert(data["error"]);
    })
    .catch( err => {
      this.spinner=true;
      console.log(err);
    });
  }

}
