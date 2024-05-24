import http from 'k6/http';

// 테스트 옵션
export const options = {
    vus: 280,
    duration: "10s",
};

export default function() {
    http.get("http://localhost:8000");
}