import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalendarShiftComponent } from './add-calendar-shift.component';

describe('AddCalendarShiftComponent', () => {
  let component: AddCalendarShiftComponent;
  let fixture: ComponentFixture<AddCalendarShiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCalendarShiftComponent]
    });
    fixture = TestBed.createComponent(AddCalendarShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
