import { TestBed } from '@angular/core/testing';

import { PruebaSupabaseService } from './supabase.service';

describe('PruebaSupabaseService', () => {
  let service: PruebaSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PruebaSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
