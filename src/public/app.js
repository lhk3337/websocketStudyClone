const socket = io(); // io함수는 socket.io가 실행하고 있는 서버를 찾음

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");

const form = welcome.querySelector("form");

room.hidden = true;
let roomName;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const showRoom = () => {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room :${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");

  socket.emit("enter_room", input.value, showRoom); // room이라는 이벤트를 서버로 emit함, argument로 object가 될 수 있음
  roomName = input.value;
  input.value = "";
};

socket.on("welcome", () => {
  addMessage("someone joined");
});

socket.on("bye", () => {
  addMessage("someone left!!");
});
socket.on("new_message", addMessage);

form.addEventListener("submit", handleRoomSubmit);
