import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleManufactureComponent } from './vehicle-manufacture.component';

describe('VehicleManufactureComponent', () => {
  let component: VehicleManufactureComponent;
  let fixture: ComponentFixture<VehicleManufactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleManufactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
