import { Test, TestingModule } from '@nestjs/testing';
import { PublishedPostsService } from './published-posts.service';

describe('PublishedPostsService', () => {
  let service: PublishedPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublishedPostsService],
    }).compile();

    service = module.get<PublishedPostsService>(PublishedPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
