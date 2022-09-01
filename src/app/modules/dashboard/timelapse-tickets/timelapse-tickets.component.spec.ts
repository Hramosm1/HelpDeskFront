import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelapseTicketsComponent } from './timelapse-tickets.component';

describe('TimelapseTicketsComponent', () => {
  let component: TimelapseTicketsComponent;
  let fixture: ComponentFixture<TimelapseTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelapseTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelapseTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
