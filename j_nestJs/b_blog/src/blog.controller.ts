import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog') // class에 붙이는 Controller 데코레이터
export class BlogController {
  // blogSerice: BlogService;
  // constructor() {
  //   this.blogSerice = new BlogService();
  // }
  constructor(private blogSerice: BlogService) {}

  @Get()
  getAllPosts() {
    console.log('모든 게시글 가져오기');
    return this.blogSerice.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto) { // HTTP 요청의 body 내용을 post에 할당
    console.log('게시글 작성');
    this.blogSerice.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  async getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] 게시글 하나 가져오기`);
    const post = await this.blogSerice.getPost(id);
    console.log(post);
    return post;
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.blogSerice.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id, @Body() postDto) {
    console.log(`[${id}] 게시글 업데이트`, id, postDto);
    return this.blogSerice.updatePost(id, postDto);
  }
}