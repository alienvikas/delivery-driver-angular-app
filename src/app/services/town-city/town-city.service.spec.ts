import { TestBed } from '@angular/core/testing';

import { TownCityService } from './town-city.service';

describe('TownCityService', () => {
  let service: TownCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TownCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
