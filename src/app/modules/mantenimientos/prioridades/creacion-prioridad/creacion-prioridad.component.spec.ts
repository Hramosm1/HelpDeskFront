import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPrioridadComponent } from './creacion-prioridad.component';

describe('CreacionPrioridadComponent', () => {
  let component: CreacionPrioridadComponent;
  let fixture: ComponentFixture<CreacionPrioridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionPrioridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionPrioridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
