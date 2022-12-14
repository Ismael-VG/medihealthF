import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMedicoComponent } from './perfil-medico.component';

describe('PerfilMedicoComponent', () => {
  let component: PerfilMedicoComponent;
  let fixture: ComponentFixture<PerfilMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
