import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionSubCategoriaComponent } from './creacion-sub-categoria.component';

describe('CreacionSubCategoriaComponent', () => {
  let component: CreacionSubCategoriaComponent;
  let fixture: ComponentFixture<CreacionSubCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionSubCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionSubCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
