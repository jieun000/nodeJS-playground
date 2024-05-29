import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
    @Get()
    hello() {
        return "안녕하세요! NextJS 첫 애플리케이션입니다.";
    }
}