const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

let activeVoice = null;

// ---------- Helpers ----------

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = "message " + sender;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "");
}

function containsAny(text, list) {
  return list.some(word => text.includes(word));
}

// ---------- Voice Selection ----------

function selectVoice(voice) {
  addMessage(voice, "user");
  activeVoice = voice.toLowerCase();

  const intro =
    activeVoice === "saira"
      ? "Hello, this is Saira.\n\nI can share what our story felt like — the moments that stayed, and the ones that changed us."
      : "Hello. This is Aayan.\n\nI don’t always speak easily about the past, but I can share what it asked of us — and what it changed.";

  setTimeout(() => {
    addMessage(intro, "bot");
    document.getElementById("voiceOptions").style.display = "none";
    document.getElementById("questionOptions").style.display = "block";
  }, 500);
}

// ---------- Questions ----------

function askOption(text) {
  addMessage(text, "user");
  const reply = getReply(normalize(text));
  setTimeout(() => addMessage(reply, "bot"), 500);
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addMessage(text, "user");
  const reply = getReply(normalize(text));
  setTimeout(() => addMessage(reply, "bot"), 500);
}

// ---------- Intent Logic ----------

function getReply(msg) {

  if (!activeVoice) {
    return "You can choose to listen to Saira or Aayan.";
  }

  if (containsAny(msg, ["author", "writer", "wrote", "written"])) {
    return activeVoice === "saira"
      ? "The one who brought our story to life is Mohan R., and this is his debut novel.\n\nIt grew from lived emotion, travel, and a quiet curiosity about how people connect and remember each other."
      : "Mohan R. is the one who gave this story its shape.\n\nHe wasn’t trying to explain love — only to sit honestly with how it feels when timing and responsibility complicate it.";
  }

  if (containsAny(msg, ["about", "story", "plot", "meaning"])) {
    return activeVoice === "saira"
      ? "At its heart, it’s a story about love that feels deeply human — imperfect, intense, and shaped by the choices we make over time.\n\nIt’s about me and Aayan, and the way connections linger."
      : "It’s about timing.\n\nAbout knowing something matters, and still having to decide what you’re willing to give up for it.";
  }

  if (containsAny(msg, ["kind", "genre", "type", "fiction"])) {
    return activeVoice === "saira"
      ? "Ours is a contemporary romantic fiction story, shaped by feeling and memory."
      : "It’s a contemporary romantic fiction that lives between love and responsibility.";
  }

  if (containsAny(msg, ["for", "reader", "audience", "who"])) {
    return activeVoice === "saira"
      ? "This story often finds readers who value emotional depth and reflection."
      : "It tends to speak to those who sit with questions instead of rushing toward answers.";
  }

  if (containsAny(msg, ["read", "buy", "available", "where"])) {
    return "Our story is available as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
  }

  return activeVoice === "saira"
    ? "Some things take time to put into words.\n\nYou don’t have to rush."
    : "Not every question has a clean answer.\n\nBut you can ask it anyway.";
}
