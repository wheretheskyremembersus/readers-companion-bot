// Elements
const chatBox = document.querySelector(".chat-box");
const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const optionsBox = document.getElementById("options");

// Active voice
let activeVoice = null;

// ---------- INTENT KEYWORDS ----------

const AUTHOR_KEYWORDS = [
  "author", "writer", "wrote", "written", "write",
  "created", "creator", "penned", "novelist",
  "storyteller", "authored", "behind"
];

const ABOUT_KEYWORDS = [
  "about", "plot", "storyline", "story line",
  "happens", "theme", "meaning", "focus",
  "explore", "explores", "summary"
];

const GENRE_KEYWORDS = [
  "kind", "type", "genre", "sort", "category",
  "style", "fiction", "romance", "romantic",
  "contemporary", "novel"
];

const AUDIENCE_KEYWORDS = [
  "for", "audience", "reader", "readers",
  "meant", "appeal", "enjoy",
  "recommend", "suitable", "resonate",
  "ideal", "right for"
];

const AVAILABILITY_KEYWORDS = [
  "read", "buy", "purchase", "available",
  "find", "get", "download", "listen",
  "ebook", "kindle", "audio",
  "paperback", "hardcover", "format"
];

// ---------- EVENTS ----------

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function askOption(text) {
  addMessage(text, "user");
  const reply = getBotReply(normalize(text));
  setTimeout(() => addMessage(reply, "bot"), 600);
}

// ---------- CORE ----------

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const reply = getBotReply(normalize(text));
  setTimeout(() => addMessage(reply, "bot"), 600);
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

function containsAny(message, keywords) {
  return keywords.some(k => message.includes(k));
}

// ---------- BRAIN ----------

function getBotReply(message) {

  // Voice selection
  if (message.includes("saira")) {
    activeVoice = "saira";
    optionsBox.style.display = "block";
    return (
      "Hello, this is Saira.\n\n" +
      "I can share what our story felt like — the moments that stayed, and the ones that changed us."
    );
  }

  if (message.includes("aayan")) {
    activeVoice = "aayan";
    optionsBox.style.display = "block";
    return (
      "Hello. This is Aayan.\n\n" +
      "I don’t always speak easily about the past, but I can share what it asked of us — and what it changed."
    );
  }

  if (!activeVoice) {
    return (
      "This story has two voices.\n\n" +
      "When you’re ready, you can choose to listen to Saira or Aayan."
    );
  }

  // 1. AUTHOR
  if (containsAny(message, AUTHOR_KEYWORDS)) {
    return activeVoice === "saira"
      ? "The one who brought our story to life is Mohan R., and this is his debut novel.\n\nIt grew from lived emotion, travel, and a quiet curiosity about how people connect and remember each other."
      : "Mohan R. is the one who gave this story its shape.\n\nHe wasn’t trying to explain love — only to sit honestly with how it feels when timing and responsibility complicate it.";
  }

  // 2. ABOUT
  if (containsAny(message, ABOUT_KEYWORDS)) {
    return activeVoice === "saira"
      ? "At its heart, it’s a story about love that feels deeply human — imperfect, intense, and shaped by the choices we make over time.\n\nIt’s about me and Aayan, about two lives crossing unexpectedly, and the way those connections linger."
      : "It’s about timing.\n\nAbout knowing something matters, and still having to decide what you’re willing to give up for it.\n\nIt’s about me and Saira, and the weight of the choices we carried long after the moments passed.";
  }

  // 3. GENRE
  if (containsAny(message, GENRE_KEYWORDS)) {
    return activeVoice === "saira"
      ? "Ours is a contemporary romantic fiction story.\n\nIt’s shaped by feeling and memory, by quiet moments that stay long after everything else moves on."
      : "Our story is a contemporary romantic fiction.\n\nIt lives in the space between love and responsibility — where wanting something doesn’t always mean choosing it.";
  }

  // 4. AUDIENCE
  if (containsAny(message, AUDIENCE_KEYWORDS)) {
    return activeVoice === "saira"
      ? "This story often finds readers who are drawn to emotion and connection.\n\nThose who enjoy reflection, atmosphere, and stories that unfold gently rather than loudly."
      : "This story tends to speak to readers who sit with questions instead of rushing toward answers.\n\nThose who understand that not every love story is about arrival.";
  }

  // 5. AVAILABILITY
  if (containsAny(message, AVAILABILITY_KEYWORDS)) {
    return (
      "Our story exists beyond this space now.\n\n" +
      "You can find it as a Kindle eBook, Paperback, Hardcover, and Audio edition."
    );
  }

  // Fallback
  return activeVoice === "saira"
    ? "Some things take time to put into words.\n\nYou don’t have to rush."
    : "Not every question has a clean answer.\n\nBut you can ask it anyway.";
}

// ---------- RENDER ----------

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.whiteSpace = "pre-line";
  msg.style.marginTop = "0";

  if (sender === "user") {
    msg.style.textAlign = "right";
    msg.style.fontWeight = "bold";
    msg.style.marginBottom = "14px";
  } else {
    msg.style.marginBottom = "40px";
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
