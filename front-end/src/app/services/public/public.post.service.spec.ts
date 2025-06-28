import { TestBed } from '@angular/core/testing';

import { PublicPostService } from './public.post.service';

describe('PublicPostService', () => {
  let service: PublicPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
