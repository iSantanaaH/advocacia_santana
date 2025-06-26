import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PostUserService } from 'src/services/public/user/post/post.user.service';

@Controller('public/post-details')
export class PostUserController {
  constructor(private readonly postUserService: PostUserService) {}
  @Get(':id')
  async showPostById(@Param('id') id: string) {
    try {
      const postResult = await this.postUserService.searchPostById(Number(id));

      console.log(postResult);
      return postResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
