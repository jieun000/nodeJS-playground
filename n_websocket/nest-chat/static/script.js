// socket.io 인스턴스 생성
const socket = io('http://localhost:3000/chat');
const nickname = prompt('닉네임을 입력해주세요.');
const roomSocket = io('http://localhost:3000/room');
let currentRoom = '';

$('#message').keydown(function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() { // 전송 버튼 클릭 시 입력된 글을 message 이벤트로 보냄
    if(currentRoom === '') {
        alert('방을 선택해주세요.');
        return;
    }
    const message = $('#message').val();
    // socket.emit('message', message);
    // $('#chat').append(`<div>나: ${message}</div>`);
    // socket.emit('message', {message, nickname});
    const data = { message, nickname, room: currentRoom };
    $('#chat').append(`<div>나: ${message}</div>`);
    roomSocket.emit('message', data);
    $('#message').val('');
    return false;
}

socket.on('connect', () => { // 서버 접속 확인을 위한 이벤트
    console.log('connected');
})

socket.on('message', (message) => { // 서버에서 message 이벤트 발생 시 처리
    $('#chat').append(`<div>${message}</div>`);
})

function createRoom() {
    const room = prompt('생성할 방의 이름을 입력해주세요.');
    roomSocket.emit('createRoom', { room, nickname });
}

// 채팅방에서 대화를 나눌 때 사용하는 이벤트
roomSocket.on('message', (data) => {
    console.log(data);
    $('#chat').append(`<div>${data.message}</div>`);
})
roomSocket.on('rooms', (data) => {
    console.log(data);
    $('#rooms').empty(); // 채팅방 갱신 시 리스트 비움
    data.forEach((room) => {
        $('#rooms').append(`<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`);
    })
})

socket.on('notice', (data) => { // notice 이벤트를 받아서 처리
    $('#notice').append(`<div>${data.message}</div>`);
})

function joinRoom(room) {
    roomSocket.emit('joinRoom', { room, nickname, roLeaveRoom: currentRoom });
    $('#chat').html(''); // 채팅방 이동 시 기존 메시지 삭제
    currentRoom = room; // 현재 들어있는 방의 값을 변경
}