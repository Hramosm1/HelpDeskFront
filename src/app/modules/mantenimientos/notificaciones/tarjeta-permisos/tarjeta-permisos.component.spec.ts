import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPermisosComponent } from './tarjeta-permisos.component';

describe('TarjetaPermisosComponent', () => {
  let component: TarjetaPermisosComponent;
  let fixture: ComponentFixture<TarjetaPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
