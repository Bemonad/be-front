import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BemonadCitationComponent } from './bemonad-citation.component';

describe('BemonadCitationComponent', () => {
  let component: BemonadCitationComponent;
  let fixture: ComponentFixture<BemonadCitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemonadCitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemonadCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
