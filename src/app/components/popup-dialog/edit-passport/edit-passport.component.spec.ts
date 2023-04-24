import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassportComponent } from './edit-passport.component';

describe('EditPassportComponent', () => {
  let component: EditPassportComponent;
  let fixture: ComponentFixture<EditPassportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPassportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
