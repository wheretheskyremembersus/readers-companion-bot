const chatBox = document.querySelector(".chat-box");
const input = document.querySelector("input");
const button = document.querySelector("button");

// Enable input and button
input.disabled = false;
button.disabled = false;

button.addEventListener("click", sendMessage);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const userText = input.value.trim();
  if (userText === "") return;

  addMessage(userText, "user");
  input.value = "";

  setTimeout(() => {
    addMessage("I hear you. I’ll be able to answer more soon.", "bot");
  }, 500);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
