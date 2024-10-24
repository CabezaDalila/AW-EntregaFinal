import { TestBed } from '@angular/core/testing';

import { DataUsersService } from './Services/data-users.service';

describe('DataUsersService', () => {
  let service: DataUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});