import { readFile, writeFile } from 'fs/promises';
import { PostDto } from './blog.model';
import { Injectable } from '@nestjs/common';

// 블로그 리포지토리 인터페이스 정의
export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto: PostDto);
}

@Injectable()
// BlogRepository를 구현한 클래스. 파일을 읽고 쓰기
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    // 파일을 읽어서 모든 게시글 불러오기
    async getAllPost(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);
        return posts;
    }
    // 게시글 쓰기
    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDto, createdDt: new Date() };
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
    // 게시글 하나 가져오기
    async getPost(id: String) {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result;
    }
    // 게시글 하나 삭제
    async deletePost(id: String) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.find((post) => post.id !== id);
        return writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }
    // 게시글 하나 수정
    async updatePost(id: String, postDto: PostDto) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = { id, ...postDto, updatedDt: new Date() };
        posts[index] = updatePost;
        return writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}