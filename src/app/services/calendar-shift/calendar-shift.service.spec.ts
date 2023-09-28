import { TestBed } from '@angular/core/testing';

import { CalendarShiftService } from './calendar-shift.service';

describe('CalendarShiftService', () => {
  let service: CalendarShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
