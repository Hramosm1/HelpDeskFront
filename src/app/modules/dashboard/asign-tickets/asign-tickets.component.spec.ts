import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignTicketsComponent } from './asign-tickets.component';

describe('AsignTicketsComponent', () => {
  let component: AsignTicketsComponent;
  let fixture: ComponentFixture<AsignTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
