import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftCalendarComponent } from './shift-calendar.component';

describe('ShiftCalendarComponent', () => {
  let component: ShiftCalendarComponent;
  let fixture: ComponentFixture<ShiftCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftCalendarComponent]
    });
    fixture = TestBed.createComponent(ShiftCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
