import { TestBed } from '@angular/core/testing';

import { PostCreatorService } from './post-creator.service';

describe('PostCreatorService', () => {
  let service: PostCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
