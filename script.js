const chatBox = document.querySelector(".chat-box");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

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

  let botReply = "I hear you. I’ll be able to answer more soon.";

  const lowerText = userText.toLowerCase();

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
  }, 300);
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.margin = "6px 0";
  msg.style.whiteSpace = "pre-line";

  if (sender === "user") {
    msg.style.textAlign = "right";
    msg.style.fontWeight = "bold";
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
