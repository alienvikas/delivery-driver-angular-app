import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailPremisesViewComponent } from './retail-premises-view.component';

describe('RetailPremisesViewComponent', () => {
  let component: RetailPremisesViewComponent;
  let fixture: ComponentFixture<RetailPremisesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailPremisesViewComponent]
    });
    fixture = TestBed.createComponent(RetailPremisesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
