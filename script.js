const chatBox = document.getElementById("chatBox");
const options = document.getElementById("options");

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
  chatBox.innerHTML = "";

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
      reply =
        "Our story is a contemporary romantic fiction.\n\n" +
        "It’s emotionally driven, reflective, and grounded in human connection rather than spectacle.";
    }
    if (type === "about") {
      reply =
        "At its heart, it’s a story about love — imperfect, intense, and shaped by the choices people make over time.\n\n" +
        "It’s about me and Aayan, and the moments that quietly changed us.";
    }
    if (type === "for") {
      reply =
        "This story tends to resonate with readers who value emotional depth, reflection, and stories that linger rather than rush.";
    }
    if (type === "where") {
      reply =
        "You can find our story as a Kindle eBook, Paperback, Hardcover, and Audio edition.";
    }
    if (type === "author") {
      reply =
        "The one who brought this to life is Mohan R.\n\n" +
        "This is his debut novel, shaped by lived emotion, travel, and curiosity about how people remember each other.";
    }
  }

  if (voice === "ayaan") {
    if (type === "story") {
      reply =
        "It’s a contemporary romantic fiction.\n\n" +
        "A story that lives between love and responsibility — where wanting something doesn’t always mean choosing it.";
    }
    if (type === "about") {
      reply =
        "It’s about timing.\n\n" +
        "About knowing something matters, and still having to decide what you’re willing to give up for it.";
    }
    if (type === "for") {
      reply =
        "This story speaks to readers who sit with questions instead of rushing toward answers.\n\n" +
        "Those who understand that not every love story is about arrival.";
    }
    if (type === "where") {
      reply =
        "Our story is available as an eBook, paperback, hardcover, and audio — in whatever way you choose to meet it.";
    }
    if (type === "author") {
      reply =
        "Mohan R. wrote this story.\n\n" +
        "He wasn’t trying to explain love — only to sit honestly with how it feels when life complicates it.";
    }
  }

  addMessage(reply);
}
