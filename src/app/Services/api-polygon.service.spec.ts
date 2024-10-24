import { TestBed } from '@angular/core/testing';

import { ApiPolygonService } from './api-polygon.service';

describe('ApiPolygonService', () => {
  let service: ApiPolygonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPolygonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
