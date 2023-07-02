import { TestBed } from '@angular/core/testing';

import { RetailPremisesService } from './retail-premises.service';

describe('RetailPremisesService', () => {
  let service: RetailPremisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailPremisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
