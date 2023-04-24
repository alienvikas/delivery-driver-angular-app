import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassportListComponent } from './add-passport-list.component';

describe('AddPassportListComponent', () => {
  let component: AddPassportListComponent;
  let fixture: ComponentFixture<AddPassportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPassportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPassportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
