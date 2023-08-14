import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //http server
const wss = new WebSocketServer({ server }); //websocket server
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("connected to Browser");
  socket.on("close", () => console.log("disconnected from Browser"));
  socket.on("message", (msg) => {
    const message = JSON.parse(msg); //javascript object 형식으로 변경해주기
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        ); //message배열의 payload 띄우기
        break;
      case "nickname":
        socket["nickname"] = message.payload; //socket에 닉네임을 넣어줌
        break;
    }
  });
});
server.listen(3000, handleListen);
