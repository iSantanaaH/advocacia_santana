import { Test, TestingModule } from '@nestjs/testing';
import { PublishedPostsController } from './published-posts.controller';

describe('PublishedPostsController', () => {
  let controller: PublishedPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishedPostsController],
    }).compile();

    controller = module.get<PublishedPostsController>(PublishedPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
