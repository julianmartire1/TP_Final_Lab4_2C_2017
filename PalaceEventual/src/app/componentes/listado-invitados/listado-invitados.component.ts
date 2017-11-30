import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-invitados',
  templateUrl: './listado-invitados.component.html',
  styleUrls: ['./listado-invitados.component.css']
})
export class ListadoInvitadosComponent implements OnInit {
  @Input() array;
  constructor() { }

  ngOnInit() {
  }

}
