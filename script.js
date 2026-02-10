// Elements
const chatBox = document.querySelector(".chat-box");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");

// Active voice: "saira" | "aayan"
let activeVoice = null;

// Events
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
  }, 600);
}

// Core logic
function getBotReply(message) {

  // ---- Voice selection ----
  if (message.includes("saira")) {
    activeVoice = "saira";
    return (
      "Hello, this is Saira.\n\n" +
      "I can share what our story felt like — the moments that stayed, and the ones that changed us."
    );
  }

  if (message.includes("aayan")) {
    activeVoice = "aayan";
    return (
      "Hello. This is Aayan.\n\n" +
      "I don’t always speak easily about the past, but I can share what it asked of us — and what it changed."
    );
  }

  // ---- No voice chosen yet ----
  if (!activeVoice) {
    return (
      "This story has two voices.\n\n" +
      "When you’re ready, you can choose to listen to Saira or Aayan."
    );
  }

  // ---- What kind of story ----
  if (
    message.includes("kind of story") ||
    message.includes("what is this") ||
    message.includes("story")
  ) {
    if (activeVoice === "saira") {
      return (
        "Ours is a contemporary romantic fiction story.\n\n" +
        "It’s shaped by feeling and memory, by quiet moments that stay long after everything else moves on."
      );
    }

    if (activeVoice === "aayan") {
      return (
        "Our story is a contemporary romantic fiction.\n\n" +
        "It lives in the space between love and responsibility — where wanting something doesn’t always mean choosing it."
      );
    }
  }

  // ---- What the story is about ----
  if (message.includes("about")) {
    if (activeVoice === "saira") {
      return (
        "At its heart, it’s a story about love that feels deeply human — imperfect, intense, and shaped by the choices we make over time.\n\n" +
        "It’s about me and Aayan, about two lives crossing unexpectedly, and the way those connections linger."
      );
    }

    if (activeVoice === "aayan") {
      return (
        "It’s about timing.\n\n" +
        "About knowing something matters, and still having to decide what you’re willing to give up for it.\n\n" +
        "It’s about me and Saira, and the weight of the choices we carried long after the moments passed."
      );
    }
  }

  // ---- Who the story is for ----
  if (message.includes("for") || message.includes("who")) {
    if (activeVoice === "saira") {
      return (
        "This story often finds readers who are drawn to emotion and connection.\n\n" +
        "Those who enjoy reflection, atmosphere, and stories that unfold gently rather than loudly."
      );
    }

    if (activeVoice === "aayan") {
      return (
        "This story tends to speak to readers who sit with questions instead of rushing toward answers.\n\n" +
        "Those who understand that not every love story is about arrival."
      );
    }
  }

  // ---- Where to read ----
  if (
    message.includes("read") ||
    message.includes("buy") ||
    message.includes("available")
  ) {
    return (
      "Our story exists beyond this space now.\n\n" +
      "You can find it as a Kindle eBook, Paperback, Hardcover, and Audio edition."
    );
  }

  // ---- Who is the author ----
  if (
    message.includes("author") ||
    message.includes("writer") ||
    message.includes("who wrote")
  ) {
    if (activeVoice === "saira") {
      return (
        "The one who brought our story to life is Mohan R., and this is his debut novel.\n\n" +
        "It grew from lived emotion, travel, and a quiet curiosity about how people connect and remember each other."
      );
    }

    if (activeVoice === "aayan") {
      return (
        "Mohan R. is the one who gave this story its shape.\n\n" +
        "He wasn’t trying to explain love — only to sit honestly with how it feels when timing and responsibility complicate it."
      );
    }
  }

  // ---- Soft fallback ----
  if (activeVoice === "saira") {
    return (
      "Some things take time to put into words.\n\n" +
      "You don’t have to rush."
    );
  }

  if (activeVoice === "aayan") {
    return (
      "Not every question has a clean answer.\n\n" +
      "But you can ask it anyway."
    );
  }
}

// Render messages
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
