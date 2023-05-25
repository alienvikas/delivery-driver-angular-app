import { TestBed } from '@angular/core/testing';

import { VehicleInsuranceCompanyService } from './vehicle-insurance-company.service';

describe('VehicleInsuranceCompanyService', () => {
  let service: VehicleInsuranceCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleInsuranceCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
