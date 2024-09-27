import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostController } from './create-post.controller';

describe('CreatePostController', () => {
  let controller: CreatePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePostController],
    }).compile();

    controller = module.get<CreatePostController>(CreatePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
