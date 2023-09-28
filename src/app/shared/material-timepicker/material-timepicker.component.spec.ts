import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTimepickerComponent } from './material-timepicker.component';

describe('MaterialTimepickerComponent', () => {
  let component: MaterialTimepickerComponent;
  let fixture: ComponentFixture<MaterialTimepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTimepickerComponent]
    });
    fixture = TestBed.createComponent(MaterialTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
