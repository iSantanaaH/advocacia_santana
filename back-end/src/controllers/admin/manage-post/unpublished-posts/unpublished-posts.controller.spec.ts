import { Test, TestingModule } from '@nestjs/testing';
import { UnpublishedPostsController } from './unpublished-posts.controller';

describe('UnpublishedPostsController', () => {
  let controller: UnpublishedPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnpublishedPostsController],
    }).compile();

    controller = module.get<UnpublishedPostsController>(UnpublishedPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
