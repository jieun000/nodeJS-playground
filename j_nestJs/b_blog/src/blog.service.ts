import { PostDto } from "./blog.model";
// import { BlogFileRepository, BlogRepository } from "./blog.repository";
import { BlogMongoRepository } from "./blog.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogService {
  // blogRepository: BlogRepository;
  // constructor() {
  //   this.blogRepository = new BlogFileRepository();
  // } // => @Injectable()
  constructor(private blogRepository: BlogMongoRepository) {}

  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto) {
    this.blogRepository.createPost(postDto);
  }

  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  delete(id) {
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}