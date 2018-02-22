import { Component, OnInit } from '@angular/core';
import { MihttpService } from '../../services/mi-http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {
  //
  spinner = false;
  evento = "";
  estacionamiento = "";
  programa = "";
  diversion = "";
  alimentos = "";
  local = "";
  numero = "";
  perfil;
  encuestas: Array<any>;
  mostrarGraficos: boolean = false;
  public pieChartLabels: string[] = ['Si', 'No'];
  public pieChartData: number[];
  public pieChartData2: number[];
  public pieChartData3: number[];
  public pieChartType: string = 'pie';


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartLabels: string[] = ['Satisfaccion del evento'];
  public barChartLabels2: string[] = ['Satisfaccion con estacionamiento', 'Satisfaccion programa'];
  public barChartLabels3: string[] = ['Satisfaccion diversion', 'Satisfaccion alimentos y bebidas'];
  public barChartData: any[];
  public barChartData2: any[];
  public barChartData3: any[];
  constructor(public http: MihttpService, public router: Router) { }

  ngOnInit() {
    this.perfil = localStorage.getItem("tipo");
    if (this.perfil == "encargado") {
      this.leerTodos();
    }
    else
      this.spinner = true;
  }

  enviarEncuesta() {
    this.spinner = false;
    let obj = {
      numero : this.numero,
      evento: this.evento,
      estacionamiento: this.estacionamiento,
      programa: this.programa,
      diversion: this.diversion,
      alimentos: this.alimentos
    };
    this.http.enviarEncuesta(obj, "/guardarEncuesta/")
      .then(res => {
        //console.log(res);
        if (res["Agregado"] == "true")
          alert("Se a guardado su encuesta!!!Gracias.");
        if (res["Agregado"] == "false")
          alert("Algo salio mal :(");
          if(res["Agregado"] != "false" || res["Agregado"] != "true")
          alert(res["Agregado"]);
        this.spinner = true;
        this.router.navigate(["/Principal"]);
      })
      .catch(err => {
        console.log(err);
        this.spinner = true;
      });
  }

  leerTodos() {
    this.spinner = false;
    this.http.leerEncuestas("/leerEncuestas/")
      .then(datos => {

        this.encuestas = datos["FECHA"];
        this.barChartData = [
          { data: [this.contarBMM('evento')[0]], label: 'Bueno' },
          { data: [this.contarBMM('evento')[1]], label: 'Medio' },
          { data: [this.contarBMM('evento')[2]], label: 'Malo' }
        ];
        //console.log("1",this.barChartData);
        this.barChartData2 = [
          { data: [this.contarBMM('estacionamiento')[0], this.contarBMM('programa')[0]], label: 'Bueno' },
          { data: [this.contarBMM('estacionamiento')[1], this.contarBMM('programa')[1]], label: 'Medio' },
          { data: [this.contarBMM('estacionamiento')[2], this.contarBMM('programa')[2]], label: 'Malo' }
        ];
        //console.log("2",this.barChartData2);
        this.barChartData3 = [
          { data: [ this.contarBMM('diversion')[0], this.contarBMM('alimentos')[0]], label: 'Bueno' },
          { data: [ this.contarBMM('diversion')[1], this.contarBMM('alimentos')[1]], label: 'Medio' },
          { data: [ this.contarBMM('diversion')[2], this.contarBMM('alimentos')[2]], label: 'Malo' }
        ];
        //console.log("3",this.barChartData3);
        /*
              this.pieChartData = [this.contarSiNo('recomendariaServicio')[0], this.contarSiNo('recomendariaServicio')[1]];
              this.pieChartData2 = [this.contarSiNo('recomendariaMShopper')[0], this.contarSiNo('recomendariaMShopper')[1]];
              this.pieChartData3 = [this.contarSiNo('concuerdaPuntajePromedio')[0], this.contarSiNo('concuerdaPuntajePromedio')[1]];*/

        this.mostrarGraficos = true;
        this.spinner = true;
      })
      .catch(error => {
        console.log(error);
      });
  }

  contarBMM(pregunta) {
    let buenos = 0;
    let medios = 0;
    let malos = 0;
    for (let index = 0; index < this.encuestas.length; index++) {
      if (this.encuestas[index][pregunta] == 'Bueno') {
        buenos++;
      }
      else if (this.encuestas[index][pregunta] == 'Medio') {
        medios++;
      }
      else {
        malos++;
      }
    }
    return [buenos, medios, malos];
  }

}
