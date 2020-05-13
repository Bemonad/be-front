import { TestBed } from '@angular/core/testing';

import { AdminAuthGardService } from './admin-auth-gard.service';

describe('AdminAuthGardService', () => {
  let service: AdminAuthGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
