import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BemonadFooterComponent } from './bemonad-footer.component';

describe('BemonadFooterComponent', () => {
  let component: BemonadFooterComponent;
  let fixture: ComponentFixture<BemonadFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemonadFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemonadFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
