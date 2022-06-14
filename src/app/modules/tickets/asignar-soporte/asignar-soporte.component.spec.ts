import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarSoporteComponent } from './asignar-soporte.component';

describe('AsignarSoporteComponent', () => {
  let component: AsignarSoporteComponent;
  let fixture: ComponentFixture<AsignarSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarSoporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
