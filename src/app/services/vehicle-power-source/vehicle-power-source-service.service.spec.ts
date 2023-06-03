import { TestBed } from '@angular/core/testing';

import { VehiclePowerSourceService } from './vehicle-power-source.service';

describe('VehiclePowerSourceServiceService', () => {
  let service: VehiclePowerSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclePowerSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
