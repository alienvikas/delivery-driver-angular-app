import { TestBed } from '@angular/core/testing';

import { PersonalDetailService } from './personal-detail.service';

describe('PersonalDetailService', () => {
  let service: PersonalDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
