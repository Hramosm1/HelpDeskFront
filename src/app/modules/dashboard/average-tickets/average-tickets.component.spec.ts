import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTicketsComponent } from './average-tickets.component';

describe('AverageTicketsComponent', () => {
  let component: AverageTicketsComponent;
  let fixture: ComponentFixture<AverageTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
