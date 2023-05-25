import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUkAreaComponent } from './add-edit-uk-area.component';

describe('AddEditUkAreaComponent', () => {
  let component: AddEditUkAreaComponent;
  let fixture: ComponentFixture<AddEditUkAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUkAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
