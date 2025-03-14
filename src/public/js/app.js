const socket = new WebSocket(`ws://${window.location.host}`);
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const messageList = document.querySelector("ul");

socket.addEventListener("open", () => {
  console.log("connected to Server");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("disconnected from Server");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = " ";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = " ";
}

function makeMessage(type, payload) {
  //string으로 바꿔줍니다.
  const msg = { type, payload };
  return JSON.stringify(msg);
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
