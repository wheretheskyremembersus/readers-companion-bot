const chatBox = document.getElementById("chatBox");
const options = document.getElementById("options");
const voiceSelect = document.getElementById("voiceSelect");

let voice = null;

function addMessage(text) {
  const msg = document.createElement("div");
  msg.className = "message";
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function selectVoice(selected) {
  voice = selected;

  // Remove voice buttons only once
  if (voiceSelect) voiceSelect.remove();

  if (voice === "saira") {
    addMessage(
      "Hello, this is Saira.\n\n" +
      "I’d love to help you understand our story — gently, honestly, and at your pace."
    );
  }

  if (voice === "ayaan") {
    addMessage(
      "Hello. This is Aayan.\n\n" +
      "I don’t always speak easily about the past, but I can share what it asked of us — and what it changed."
    );
  }

  options.style.display = "grid";
}

function ask(type) {
  let reply = "";

  if (voice === "saira") {
    if (type === "story") {
      reply = "Our story is a contemporary romantic fiction.\n\nIt’s emotionally driven and grounded in human connection.";
    }
    if (type === "about") {
      reply = "At its heart, it’s a story about love — imperfect, intense, and shaped by choice.\n\nIt’s about me and Aayan.";
    }
    if (type === "for") {
      reply = "This story is for readers who value emotion, reflection, and quiet honesty.";
    }
    if (type === "where") {
      reply = "You can find our story as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
    }
    if (type === "author") {
      reply = "Mohan R. wrote this as his debut novel — shaped by lived emotion and personal travel.";
    }
  }

  if (voice === "ayaan") {
    if (type === "story") {
      reply = "It’s a contemporary romantic fiction.\n\nA story that lives between love and responsibility.";
    }
    if (type === "about") {
      reply = "It’s about timing.\n\nAbout knowing something matters, and still having to let it go.";
    }
    if (type === "for") {
      reply = "This story is for those who understand that not every love story ends where we want it to.";
    }
    if (type === "where") {
      reply = "Our story exists in eBook, print, and audio — however you choose to meet it.";
    }
    if (type === "author") {
      reply = "Mohan R. wrote this story without trying to explain love — only to sit with it honestly.";
    }
  }

  addMessage(reply);
}
