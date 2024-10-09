import { TestBed } from '@angular/core/testing';

import { UnpublishedService } from './unpublished.service';

describe('UnpublishedService', () => {
  let service: UnpublishedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnpublishedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
