const socket = io(); // io함수는 socket.io가 실행하고 있는 서버를 찾음

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

const handleRoomSubmit = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, (msg) => {
    console.log(msg);
    console.log("Server is done!");
  }); // room이라는 이벤트를 서버로 emit함, argument로 object가 될 수 있음
  input.value = "";
};

form.addEventListener("submit", handleRoomSubmit);
