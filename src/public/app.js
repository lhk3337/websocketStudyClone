// Put all your frontend code here.
const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");

const Serversocket = new WebSocket(`wss://${window.location.host}`); // 웹소켓 커넥션 만들기

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg); // JS 객체를 string으로 변환, 변환하는 이유는 다른 언어에서 JS 객체를 알지 못하기 때문에 string으로 변환
}

Serversocket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
}); // 브라우저와 서버와의 연결

Serversocket.addEventListener("message", (message) => {
  // console.log(`New message: ${message.data}`);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
}); // 서버에서 보낸 메시지를 브라우저에서 메시지를 확인

Serversocket.addEventListener("close", () => {
  console.log("DisConnected to Server ❌");
}); //서버와 통신이 끊어질 경우

// setTimeout(() => {
//   Serversocket.send("hello from the browser!"); // 브라우저에서 서버로 메시지를 보냄
// }, 10000);

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  //   Serversocket.send(input.value);
  Serversocket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickNameSubmit(e) {
  e.preventDefault();
  const input = nicknameForm.querySelector("input");
  //   Serversocket.send({ type: "nickname", payload: input.value });
  Serversocket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickNameSubmit);
