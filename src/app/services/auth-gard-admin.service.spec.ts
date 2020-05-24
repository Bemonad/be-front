import { TestBed } from '@angular/core/testing';

import { AuthGardAdminService } from './auth-gard-admin.service';

describe('AuthGardAdminService', () => {
  let service: AuthGardAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGardAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
