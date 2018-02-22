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
  spinner = false;
  constructor(public servicio : MihttpService,public router : Router) { }

  registrar()
  {
    this.spinner=false;
    let cliente : Cliente = new Cliente(this.usuario,this.clave);
    let obj = {
      usuario : cliente.usuario,
      clave : cliente.clave,
      tipo : "cliente"
    };

    this.servicio.registrar(obj,"/registrar/")
    .then( data => {
      this.spinner=true;
      console.log(data);
      if(data["bandera"] == false)
      {
        alert(data["error"]);
        return;
      }
      if(data["datos"]["bandera"] == true)
        {
          this.router.navigate(["/Login"]);
          alert("Cuenta creada con exito");
        }
      else 
      {
        if(data["datos"]["bandera"] == false)
          {
            this.router.navigate(["/Login"]);
            alert(data["error"]);
          }
      }
      
    })
    .catch( err => {
      console.log(err);
      this.spinner=true;
    });
  }

  ngOnInit() {
    this.spinner=true;
  }

}
