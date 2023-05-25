import { TestBed } from '@angular/core/testing';

import { VehicleManufactureService } from './vehicle-manufacture.service';

describe('VehicleManufactureService', () => {
  let service: VehicleManufactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleManufactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
