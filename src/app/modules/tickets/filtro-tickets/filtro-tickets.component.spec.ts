import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTicketsComponent } from './filtro-tickets.component';

describe('FiltroTicketsComponent', () => {
  let component: FiltroTicketsComponent;
  let fixture: ComponentFixture<FiltroTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
