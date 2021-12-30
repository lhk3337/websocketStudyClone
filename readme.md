# Web socket을 이용한 Zoom Clone Coding with Nomad Coder

## Stack

- Backend : node.js

- Frontend: pug, Vanilla Javascript

<br />

## socketIO

- socketIO는 websocket의 부가 기능이 아님
- socketIO는 프론트엔드와 백엔드 간 실시간 통신을 가능케 하는 프레임 워크
- websocket도 실시간 기능을 제공하지만, socketIO는 실시간 기능을 더 쉽게 만드는 코드를 제공
- socketIO가 websocket를 이용하여 연결에 실패 하더라도 다른 방법으로 재연결을 시도함, 신뢰성과 빠른 속도 제공
- 하지만 많은 기능들을 제공해 주기 떄문에 websocket보다 많이 무거움
- localhost:3000/socket.io/socket.io.js의 정보를 client에게 넘겨준다.

<br />

#### Client : socket.emit()

- socket.emit 첫번째 argument : 이벤트 이름
- socket.emit 두번째 argument부터 서버로 보내고 싶은 payload(아무 타입 가능)
- socket.emit 마지막 argument는 실행되는 function을 서버로 보내고 싶을때 사용
- 특정한 event를 emit 할 수 있음 (event는 아무 이름 올 수 있음)
- argument로 Object가 올 수 있음 -> Object를 전송 할 수 있음, 웹 소켓에서는 Object를 string으로 변환해서 보내야 만 했음
- 설정한 이벤트를 서버로 emit함

```js
const socket = io();
socket.emit("event", { Object }, () => {
  // 두번째 argument는 어떤 타입이든지 올 수 있음
  // 마지막 argument는 함수가 와야 함
  console.log("Server is done!");
});
```

#### Server

```js
const httpServer = http.createServer(app);

const wsServer = new Server(httpServer); //socketIO 연결

wsServer.on("connection", (socket) => {
  //   console.log(socket);
  socket.on("enter_room", (msg, done) => {
    console.log(msg); // client의 socket.emit의 두번째 argument인 payload 실행
    setTimeout(() => {
      done(); // client의 socket.emit의 마지막 argument인 함수 호출(Server is done! 출력)
    }, 5000);
  }); // Client에서 설정한 enter_room이라는 이벤트를 서버에서 확인
});
```

백엔드에서 function애 argument를 보낼 수 있음

```js
// Client
socket.emit("enter_room", input.value, (msg) => {
  // backend의 함수의 argument를 매개변수로 받아 출력
  console.log(msg); // hello from the backend 출력
});

// Server
socket.on("enter_room", (roomName, done) => {
  console.log(roomName);
  setTimeout(() => {
    done("hello from the backend"); // argument
  });
});
```

- done() 함수는 backend에서 보안 문제가 발생할 수 있기 때문에 함수를 실행하지 않고 함수를 호출만 하고, 함수는 front-end에서 실행 됨

#### socketIO 서버가 끊기더라도 클라이언트에서 서버가 연결 할때까지 재연결 시도 함

### rooms

#### socket.join - socket에 주어진 방을 추가

```js
socket.on("enter_room", (roomName, done) => {
  console.log(socket.rooms); // Set(1) { 'VJYYAbdN3bN2wUZqAAAD' } -> <socket.id>
  socket.join(roomName); // Clinet의 socket.emit 두번째 매개변수
  console.log(socket.rooms); // Set(2) { 'VJYYAbdN3bN2wUZqAAAD','roomName' }
});
```

#### socket.onAny() - socket에 있는 모든 event를 확인

```js
wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`socket Event: ${event}`); // socket Event: enter_room
  });
});
```
