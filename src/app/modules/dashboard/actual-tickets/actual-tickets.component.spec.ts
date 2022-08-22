import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTicketsComponent } from './actual-tickets.component';

describe('ActualTicketsComponent', () => {
  let component: ActualTicketsComponent;
  let fixture: ComponentFixture<ActualTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
