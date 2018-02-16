import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaInvitadoComponent } from './mapa-invitado.component';

describe('MapaInvitadoComponent', () => {
  let component: MapaInvitadoComponent;
  let fixture: ComponentFixture<MapaInvitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaInvitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
