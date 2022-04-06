import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDeSoporteComponent } from './personal-de-soporte.component';

describe('PersonalDeSoporteComponent', () => {
  let component: PersonalDeSoporteComponent;
  let fixture: ComponentFixture<PersonalDeSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDeSoporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDeSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
