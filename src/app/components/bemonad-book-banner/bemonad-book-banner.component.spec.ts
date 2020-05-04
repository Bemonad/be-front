import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BemonadBookBannerComponent } from './bemonad-book-banner.component';

describe('BemonadBookBannerComponent', () => {
  let component: BemonadBookBannerComponent;
  let fixture: ComponentFixture<BemonadBookBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BemonadBookBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BemonadBookBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
