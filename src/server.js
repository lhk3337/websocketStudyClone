import http from "http";

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

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(process.env.PORT, handleListen);
