const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const chatCard = document.getElementById("chatCard");

let activeVoice = null;

/* ---------- Toggle Chat ---------- */
function toggleChat() {
  chatCard.style.display =
    chatCard.style.display === "flex" ? "none" : "flex";
}

/* ---------- Helpers ---------- */
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

/* ---------- Voice Selection ---------- */
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
  }, 400);
}

/* ---------- Question Buttons ---------- */
function askOption(text) {
  addMessage(text, "user");
  const reply = getReply(normalize(text));
  setTimeout(() => addMessage(reply, "bot"), 400);
}

/* ---------- Free Text ---------- */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addMessage(text, "user");
  const reply = getReply(normalize(text));
  setTimeout(() => addMessage(reply, "bot"), 400);
}

/* ---------- Intent Logic ---------- */
function getReply(msg) {
  if (!activeVoice) {
    return "You can listen through Saira or Aayan when you’re ready.";
  }

  if (containsAny(msg, ["author", "writer", "wrote", "written"])) {
    return activeVoice === "saira"
      ? "The one who brought our story to life is Mohan R., and this is his debut novel.\n\nIt grew from lived emotion, travel, and a quiet curiosity about how people connect and remember."
      : "Mohan R. gave this story its shape.\n\nNot to explain love — but to sit honestly with how it feels.";
  }

  if (containsAny(msg, ["about", "story", "plot", "meaning"])) {
    return activeVoice === "saira"
      ? "At its heart, it’s a story about love that feels deeply human.\n\nImperfect, intense, and shaped by choice."
      : "It’s about timing.\n\nAbout knowing something matters, and still having to choose.";
  }

  if (containsAny(msg, ["kind", "genre", "type", "fiction"])) {
    return activeVoice === "saira"
      ? "Ours is a contemporary romantic fiction — reflective and grounded in emotion."
      : "A contemporary romantic fiction that lives between love and responsibility.";
  }

  if (containsAny(msg, ["for", "reader", "audience", "who"])) {
    return activeVoice === "saira"
      ? "Readers who value emotional depth and atmosphere often feel at home here."
      : "Those who sit with questions instead of rushing toward answers.";
  }

  if (containsAny(msg, ["read", "buy", "available", "where"])) {
    return "Our story is available as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
  }

  return activeVoice === "saira"
    ? "Some things don’t need quick answers.\n\nYou can stay here a while."
    : "Not every question resolves cleanly.\n\nThat’s part of the story.";
}
