import { Test, TestingModule } from '@nestjs/testing';
import { UnpublishedPostsService } from './unpublished-posts.service';

describe('UnpublishedPostsService', () => {
  let service: UnpublishedPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnpublishedPostsService],
    }).compile();

    service = module.get<UnpublishedPostsService>(UnpublishedPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
