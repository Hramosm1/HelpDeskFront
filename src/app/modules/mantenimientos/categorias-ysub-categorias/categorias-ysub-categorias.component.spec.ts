import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasYSubCategoriasComponent } from './categorias-ysub-categorias.component';

describe('CategoriasYSubCategoriasComponent', () => {
  let component: CategoriasYSubCategoriasComponent;
  let fixture: ComponentFixture<CategoriasYSubCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasYSubCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasYSubCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
