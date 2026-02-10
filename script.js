// Get page elements
const chatBox = document.querySelector(".chat-box");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

// Attach events
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
  let botReply = "I hear you. I will be able to answer more soon.";

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

  // QUESTION 2: What kind of story is this?
  else if (
  lowerText.includes("kind of story") ||
  lowerText.includes("story is this") ||
  lowerText.includes("genre") ||
  lowerText.includes("type of book") ||
  lowerText.includes("what kind")
  ) {
    botReply =
      "This is a contemporary romantic fiction story.\n\n" +
      "It focuses on emotion, memory, and human connection rather than fast-paced action or dramatic twists. The story is reflective, intimate, and grounded in real emotional experiences.";
  }

  // QUESTION 3: What is the book about?
 else if (
  lowerText.includes("book about") ||
  lowerText.includes("story about") ||
  lowerText.includes("summary") ||
  lowerText.includes("what is this book")
  ) {
    botReply =
      "At its heart, this is a story about love that feels deeply human — imperfect, intense, and shaped by the choices people make over time.\n\n" +
      "It follows two individuals whose lives intersect in unexpected ways, carrying them across different cities, moments, and emotional landscapes.";
  }

  // QUESTION 4: Who is this book for?
  else if (
  lowerText.includes("who is this book for") ||
  lowerText.includes("who should read") ||
  lowerText.includes("is this book for me") ||
  lowerText.includes("who is it for")
  ) {
    botReply =
      "This book tends to resonate with readers who enjoy emotionally driven stories.\n\n" +
      "It is a good fit if you appreciate character-focused journeys, reflective writing, and stories that linger emotionally rather than offering quick resolutions.";
  }

  // QUESTION 5: Where can I read or buy the book?
  else if (
  lowerText.includes("where can i read") ||
  lowerText.includes("where to buy") ||
  lowerText.includes("where can i get") ||
  lowerText.includes("available") ||
  lowerText.includes("formats")
  ) {
    botReply =
      "The book is available in multiple formats, so you can choose what suits you best.\n\n" +
      "You can find it as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
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
