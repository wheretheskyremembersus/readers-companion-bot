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

  const lowerText = userText.toLowerCase();
  let botReply = "I hear you. I’ll be able to answer more soon.";

  // QUESTION 1: Who is the author?
  if (
    lowerText.includes("author") ||
    lowerText.includes("who wrote") ||
    lowerText.includes("writer")
  ) {
    botReply =
      "The author is Mohan R., and this is his debut novel.\n\n" +
      "The story was shaped by lived emotion, personal travel experiences, and a curiosity about how people connect, drift apart, and remember each other over time.\n\n" +
      "Rather than trying to create a perfect love story, the author wanted to explore something more honest — how love feels when life, distance, timing, and responsibility complicate it.";
  }

  setTimeout(() => {
    addMessage(botReply, "bot");
  }, 500);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
