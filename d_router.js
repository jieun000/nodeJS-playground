const http = require("http");
const url = require("url"); // url 모듈 로딩

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; // 패스명 할당
    res.setHeader("Content-Type", "text/html");

    if(path === "/user") {
        res.end("[user] name: routerName, age: 30");
    } else if(path === "/feed") {
        res.end(`<ul>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>`);
    } else {
        res.statusCode = 404;
        res.end("404 page not found");
    }
}).listen("3000", () => { console.log("라우터 만들기")});