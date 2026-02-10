const chatCard = document.getElementById("chatCard");
const chatBox = document.getElementById("chatBox");
const voiceOptions = document.getElementById("voiceOptions");
const questionOptions = document.getElementById("questionOptions");

let voice = null;

function toggleChat() {
  chatCard.style.display =
    chatCard.style.display === "flex" ? "none" : "flex";
}

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function selectVoice(name) {
  voice = name;
  addMessage(name, "user");

  let intro = "";

  if (voice === "Saira") {
    intro =
      "Hello, this is Saira.\n\n" +
      "I would love to help you understand our story — not just what happened, but how it felt.\n\n" +
      "You can ask about the author, the story, who it’s for, or where to read it.";
  }

  if (voice === "Aayan") {
    intro =
      "Hello. This is Aayan.\n\n" +
      "I don’t always speak easily about the past.\n\n" +
      "But I can share what our story asked of us — and what it changed.";
  }

  setTimeout(() => {
    addMessage(intro);
    voiceOptions.style.display = "none";
    questionOptions.style.display = "flex";
  }, 400);
}

function ask(type) {
  let reply = "";

  if (voice === "Saira") {
    if (type === "kind")
      reply =
        "Ours is a contemporary romantic fiction.\n\n" +
        "It’s emotionally driven, reflective, and grounded in human connection rather than fast-paced action.";
    if (type === "about")
      reply =
        "At its heart, it’s a story about love that feels deeply human — imperfect, intense, and shaped by choice.\n\n" +
        "It follows me and Aayan across different cities, moments, and emotional landscapes.";
    if (type === "for")
      reply =
        "This story resonates with readers who value emotional depth, atmosphere, and reflection.\n\n" +
        "It’s for those who like stories that linger.";
    if (type === "author")
      reply =
        "The one who brought this story to life is Mohan R., and this is his debut novel.\n\n" +
        "It was shaped by lived emotion, travel, and quiet observation.";
    if (type === "where")
      reply =
        "Our story is available as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
  }

  if (voice === "Aayan") {
    if (type === "kind")
      reply =
        "It’s a contemporary romantic fiction.\n\n" +
        "A story that lives between love and responsibility.";
    if (type === "about")
      reply =
        "It’s about timing.\n\n" +
        "About knowing something matters, and still having to decide what you’re willing to give up for it.";
    if (type === "for")
      reply =
        "This story tends to speak to readers who sit with questions instead of rushing toward answers.\n\n" +
        "Those who understand that not every love story is about arrival.";
    if (type === "author")
      reply =
        "Mohan R. gave this story its voice.\n\n" +
        "Not to explain love — but to sit honestly with how it feels.";
    if (type === "where")
      reply =
        "You can find our story as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
  }

  addMessage(reply);
}
