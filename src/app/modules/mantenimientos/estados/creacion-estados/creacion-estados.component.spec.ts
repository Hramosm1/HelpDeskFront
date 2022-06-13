import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionEstadosComponent } from './creacion-estados.component';

describe('CreacionEstadosComponent', () => {
  let component: CreacionEstadosComponent;
  let fixture: ComponentFixture<CreacionEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
