import { MihttpService } from '../../services/mi-http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../clases/cliente';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  usuario : string="";
  clave : string="";
  clave2 : string="";
  constructor(public servicio : MihttpService,public router : Router) { }

  registrar()
  {
    let cliente : Cliente = new Cliente(this.usuario,this.clave);
    let obj = {
      usuario : cliente.usuario,
      clave : cliente.clave,
      tipo : "cliente"
    };

    this.servicio.registrar(obj,"http://localhost/servidor/BackEnd-PHP-jwt/api/registrar/")
    .then( data => {
      console.log(data);
      if(data["bandera"] == true)
        this.router.navigate(["/Login"]);
      else 
      {
        if(data["bandera"] == false)
          {
            this.router.navigate(["/Login"]);
            alert(data["error"]);
          }
      }
    })
    .catch( err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
