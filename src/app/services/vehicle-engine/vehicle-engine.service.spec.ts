import { TestBed } from '@angular/core/testing';

import { VehicleEngineService } from './vehicle-engine.service';

describe('VehicleEngineService', () => {
  let service: VehicleEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
