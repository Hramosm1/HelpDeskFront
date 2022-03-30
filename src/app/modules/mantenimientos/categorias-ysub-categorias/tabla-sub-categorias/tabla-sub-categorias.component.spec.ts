import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSubCategoriasComponent } from './tabla-sub-categorias.component';

describe('TablaSubCategoriasComponent', () => {
  let component: TablaSubCategoriasComponent;
  let fixture: ComponentFixture<TablaSubCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSubCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSubCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
