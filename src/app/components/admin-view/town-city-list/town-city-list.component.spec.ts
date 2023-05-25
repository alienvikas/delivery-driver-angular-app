import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownCityListComponent } from './town-city-list.component';

describe('TownCityListComponent', () => {
  let component: TownCityListComponent;
  let fixture: ComponentFixture<TownCityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownCityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TownCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
