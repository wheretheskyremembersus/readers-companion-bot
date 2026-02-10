// Get elements
const chatBox = document.querySelector(".chat-box");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

// Event listeners
button.addEventListener("click", sendMessage);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  input.value = "";

  const reply = getBotReply(text.toLowerCase());

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 300);
}

// Core brain
function getBotReply(message) {

  // Q1: Who is the author? (with typo tolerance)
  if (
    message.includes("author") ||
    message.includes("writer") ||
    message.includes("who wrote") ||
    message.includes("aurthor") ||
    message.includes("aurthot")
  ) {
    return (
      "The author is Mohan R., and this is his debut novel.\n\n" +
      "The story was shaped by lived emotion, personal travel experiences, and a curiosity about how people connect, drift apart, and remember each other over time.\n\n" +
      "Rather than trying to create a perfect love story, the author wanted to explore something more honest — how love feels when life, distance, timing, and responsibility complicate it."
    );
  }

  // Q2: What kind of story is this?
  if (
    message.includes("kind of story") ||
    message.includes("type of story") ||
    message.includes("genre") ||
    (message.includes("story") && message.includes("what"))
  ) {
    return (
      "This is a contemporary romantic fiction story.\n\n" +
      "It is emotionally driven, reflective, and grounded in human connection rather than fast-paced action or dramatic twists."
    );
  }

  // Q3: What is the book about?
  if (
    message.includes("book about") ||
    message.includes("story about") ||
    message.includes("summary") ||
    message.includes("plot")
  ) {
    return (
      "At its heart, this is a story about love that feels deeply human — imperfect, intense, and shaped by the choices people make over time.\n\n" +
      "It follows two individuals whose lives intersect unexpectedly across different cities, moments, and emotional landscapes."
    );
  }

  // Q4: Who is this book for?
  if (
    message.includes("who is this book for") ||
    message.includes("who should read") ||
    message.includes("for me") ||
    message.includes("audience")
  ) {
    return (
      "This book tends to resonate with readers who enjoy emotionally driven, character-focused stories.\n\n" +
      "It is well suited for readers who value reflection, atmosphere, and emotional depth over fast-paced plots."
    );
  }

  // Q5: Where can I read or buy the book?
  if (
    message.includes("where can i read") ||
    message.includes("where to buy") ||
    message.includes("where can i get") ||
    message.includes("available") ||
    message.includes("formats")
  ) {
    return (
      "The book is available in multiple formats.\n\n" +
      "You can find it as a Kindle eBook, Paperback, Hardcover, and Audio edition."
    );
  }

  // Friendly fallback
  return (
    "I can help you understand the book better.\n\n" +
    "You can ask about the author, what kind of story this is, what the book is about, who it is for, or where to read it."
  );
}

// Message renderer
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
