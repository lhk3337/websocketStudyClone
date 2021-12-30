import { createServer } from "http";

import { Server, Socket } from "socket.io";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set("view engine", "pug");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = createServer(app);

const wsServer = new Server(httpServer); //socketIO 연결

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    // console.log(socket.rooms);
    // socket.join(roomName);
    // console.log(socket.rooms);
    // setTimeout(() => {
    //   done("hello from the backend");
    // }, 5000);
    socket.join(roomName);
    done();
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
