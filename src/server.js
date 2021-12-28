import http from "http";
import WebSocket from "ws";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "pug");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // 웹 소켓 커넥션 만들기

// Put all your backend code here.

let sockets = []; //fake DB

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "";
  console.log("Connect to Browser ✅"); // 서버와 브라우저와 연결
  socket.on("close", () => console.log("Disconnected from the Browser ❌")); // 브라우저와 통신이 끊어질 경우
  socket.on("message", (msg) => {
    // socket.send(msg); // 브라우저가 서버에 메시지를 보내고 다시 서버가 브라우저로 메시지를 다시 보낸 경우
    const message = JSON.parse(msg); // String을 JS 객체로 변환

    // if (message.type === "new_message") {
    //   sockets.map((aSocket) => aSocket.send(message.payload));
    // } else if (message.type === "nicknanme") {
    //   sockets.map((aSocket) => aSocket.send(message.payload));
    // } // if문 보다 switch문으로 설정하면 더 코드 가독성이 있음

    switch (message.type) {
      case "new_message":
        sockets.map((aSocket) => aSocket.send(`${socket.nickname} : ${message.payload}`));
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
      default:
        console.log("done");
    }

    // console.log("Object", parsed, "String", message);
    // sockets.map((aSocket) => aSocket.send(message));
  });
  // socket.on("message", (message) => console.log(message)); // 브라우저가 서버에 메시지를 보냈을 때
  // socket.send("hello!!!"); // 브라우저에게 메시지 전달
}); // 서버에서 브라우저로 통신

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
