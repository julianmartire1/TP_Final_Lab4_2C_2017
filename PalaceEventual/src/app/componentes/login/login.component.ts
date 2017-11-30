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
  constructor(public servicio : MihttpService,public router : Router) { 
  }

  ngOnInit() {
  }

  reservar()
  {
    this.router.navigate(["/Reservar"]);
  }

  registrar()
  {
    this.router.navigate(["/Registrar"]);
  }

  ingresar()
  {
    let cliente : Cliente = new Cliente(this.usuario,this.clave);
    let obj = {
      usuario : cliente.usuario,
      clave : cliente.clave
    };

    this.servicio.post(obj,"http://localhost/servidor/BackEnd-PHP-jwt/api/ingreso/")
    .then( data => {
      console.log(data);
      if(data["bandera"] == true)
      {
        localStorage.setItem("token",data["token"]);
        localStorage.setItem("usuario",data["datos"]["usuario"]);
        this.router.navigate(["/Principal"]);
      }
      else
        alert(data["error"]);
    })
    .catch( err => {
      console.log(err);
    });
  }

}
