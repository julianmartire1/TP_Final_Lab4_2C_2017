
import { Injectable } from '@angular/core';

import { Http, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { AuthHttp } from 'angular2-jwt';
@Injectable()
export class MihttpService {

  //localhost="http://localhost/servidor/BackEnd-PHP-jwt/api";
  localhost="/finalapi/api";
  constructor(private http: Http) { }

  httpGetPromise(url: string) {
    return this.http
      //.get("/finalapi/api" +  url)
      .get(this.localhost + url)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }

  httpPostPromise(url: string, obj: any) {
    return this.http
      //.post("/finalapi/api" +  url, obj)
      .post(this.localhost + url,obj)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }

  httpDeletePromise(url: string, obj: any) {
    return this.http
      //.delete("/finalapi/api" +  url, new RequestOptions({ body: obj }))
      .delete(this.localhost +  url, new RequestOptions({ body: obj }))
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }

  post(data: Object, url: string) {
    return this.http
      //.post("/finalapi/api" +  url, data)
      .post(this.localhost + url,data)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }/*
  getPayload(){
    let headers = new Headers({ 'Authorization': localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    //this.createAuthorizationHeader(headers, user);

    return this.authHttp
      .get(this.url + "traerPayload/", options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
    //let token=localStorage.getItem("token")
  }*/

  registrar(data: Object, url: string){
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  reservar(data: Object, url: string){
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  eliminarInvitado(data: Object, url: string){
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  modificarInvitado(data: Object, url: string){
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  reservasCliente(data: Object, url: string)
  {
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  traerTipoDeUsuario(data : Object, url: string)
  {
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  traerTodasLasReservas(url: string) {
    return this.http
      //.get("/finalapi/api" +  url)
      .get(this.localhost + url)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }

  leerEncuestas(url: string) {
    return this.http
      //.get("/finalapi/api" +  url)
      .get(this.localhost + url)
      .toPromise()
      .then(this.extraerDatos)
      .catch(this.handleError);
  }

  enviarEncuesta(data: Object, url: string){
    return this.http
    //.post("/finalapi/api" +  url, data)
    .post(this.localhost + url,data)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.handleError);
  }

  private extraerDatos(resp: Response) {
    return resp.json() || {};
  }
  private handleError(error: Response | any) {
    return error;
  }

}
