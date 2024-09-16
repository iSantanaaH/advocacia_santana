import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createPostGuard } from './create-post.guard';

describe('createPostGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => createPostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
