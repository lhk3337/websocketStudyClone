const socket = io(); // io함수는 socket.io가 실행하고 있는 서버를 찾음

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;
const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");

  socket.emit("enter_room", input.value, () => {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room :${roomName}`;
  }); // room이라는 이벤트를 서버로 emit함, argument로 object가 될 수 있음
  roomName = input.value;
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
