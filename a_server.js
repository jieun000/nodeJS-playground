const http = require("http"); // http 객체 생성
let count = 0;
const server = http.createServer((req, res) => { // 서버 객체 생성
    log(count); // 카운트 1 증가
    res.statusCode = 200; // 결괏값 200
    res.setHeader("Content-Type", "text/plain"); // 헤더 설정
    res.write("hello\n");
    setTimeout(()=> {
        res.end("Node.js"); // 10초 후 출력
    }, 2000);
});

function log(count) {
    console.log((count += 1));
}

server.listen(8000); // 8000번 포트로 서버 실행