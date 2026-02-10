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
      "You’re listening to Saira now.\n\n" +
      "I tend to speak through memory and feeling.\n" +
      "You can ask me what stayed with me, what I felt, or what I still carry."
    );
  }

  if (message.includes("aayan")) {
    activeVoice = "aayan";
    return (
      "You’re listening to Aayan now.\n\n" +
      "I speak reflectively.\n" +
      "You can ask me about love, choice, distance, or what it cost to decide."
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
    return (
      "Our story is a contemporary romantic fiction.\n\n" +
      "It isn’t shaped by grand events, but by moments —\n" +
      "the kind that stay with you even as life keeps moving."
    );
  }

  // ---- What the story is about ----
  if (message.includes("about")) {
    if (activeVoice === "saira") {
      return (
        "For me, it was about what lingers.\n\n" +
        "About how someone can become part of you quietly,\n" +
        "without ever asking permission."
      );
    }

    if (activeVoice === "aayan") {
      return (
        "It was about timing.\n\n" +
        "About knowing something matters,\n" +
        "and still having to choose what you’re willing to carry."
      );
    }
  }

  // ---- Who the story is for ----
  if (message.includes("for") || message.includes("who")) {
    return (
      "This story often finds people who read slowly.\n\n" +
      "Those who notice silences, places,\n" +
      "and the weight of what isn’t said."
    );
  }

  // ---- Where to read ----
  if (
    message.includes("read") ||
    message.includes("buy") ||
    message.includes("available")
  ) {
    return (
      "Our story exists in a few forms.\n\n" +
      "You can find it as a Kindle eBook,\n" +
      "Paperback, Hardcover, and Audio edition."
    );
  }

  // ---- Soft fallback (voice-aware) ----
  if (activeVoice === "saira") {
    return (
      "Some things are harder to put into words.\n\n" +
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
