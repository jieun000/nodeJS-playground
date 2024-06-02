import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' }) // 웹소켓 서버 설정 데코레이터
export class ChatGateway {
  
  @WebSocketServer() server: Server; // 웹소켓 서버 인스턴스 선언
  @SubscribeMessage('message') // message 이벤트 구독
  handleMessage(socket: Socket, data: any): void {
    // 접속한 클라이언트에 메시지 전송
    // this.server.emit('message', `client-${socket.id.substring(0, 4)} : ${data}`);

    const { message, nickname } = data; // 메시지와 닉네임을 데이터에서 추출
    socket.broadcast.emit('message', `${nickname}: ${message}`); // 닉네임을 포함한 메시지 전송
  }
}

@WebSocketGateway({ namespace: 'room' }) // room 네임스페이스 사용하는 게이트웨이
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {} // 채팅 게이트웨이 의존성 주입
  rooms = [];

  @WebSocketServer()  // 서버 인스턴스 접근을 위한 변수 선언
  server: Server;

  @SubscribeMessage('createRoom') // createRoom(방 입장 시 실행) 핸들러 메서드
  handleMessage(@MessageBody() data) { // 소켓 없이 데이터만 받음
    const { nickname, room } = data;
    // 방 생성 시 이벤트 발생시켜 클라이언트에 송신
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 만들었습니다.`
    });
    this.rooms.push(room); // 채팅방 정보 받아서 추가
    this.server.emit('rooms', this.rooms); // rooms 이벤트로 채팅방 리스트 전송
  }

  @SubscribeMessage('joinRoom') // 방 입장 시 실행되는 핸들러 메서드
  handleJoinRoom(socket: Socket, data) { // 소켓 없이 데이터만 받음
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다.`
    });
    socket.join(room);
  }

  @SubscribeMessage('message') // message 이벤트 구독
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;
    console.log(data);
    // 나 이외의 사람에게 데이터 전송
    socket.broadcast.to(room).emit('message', {
      message: `${nickname}: ${message}`
    });
  }
}

