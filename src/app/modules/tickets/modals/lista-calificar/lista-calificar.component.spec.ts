import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCalificarComponent } from './lista-calificar.component';

describe('ListaCalificarComponent', () => {
  let component: ListaCalificarComponent;
  let fixture: ComponentFixture<ListaCalificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCalificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
