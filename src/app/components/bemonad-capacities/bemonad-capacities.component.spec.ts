import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BemonadCapacitiesComponent } from './bemonad-capacities.component';

describe('BemonadCapacitiesComponent', () => {
  let component: BemonadCapacitiesComponent;
  let fixture: ComponentFixture<BemonadCapacitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemonadCapacitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemonadCapacitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
