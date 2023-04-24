import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkAreaTelephoneListComponent } from './uk-area-telephone-list.component';

describe('UkAreaTelephoneListComponent', () => {
  let component: UkAreaTelephoneListComponent;
  let fixture: ComponentFixture<UkAreaTelephoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UkAreaTelephoneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkAreaTelephoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
