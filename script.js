let selectedVoice = null;
const chatCard = document.getElementById("chatCard");
const chatBox = document.getElementById("chatBox");

function toggleChat() {
  chatCard.style.display =
    chatCard.style.display === "flex" ? "none" : "flex";
}

function selectVoice(voice) {
  selectedVoice = voice;
  chatBox.innerHTML += `<p><strong>Hello, this is ${voice === "saira" ? "Saira" : "Aayan"}.</strong></p>`;
  showQuestions();
}

function showQuestions() {
  const questions = `
    <div class="question-buttons">
      <button class="btn ${selectedVoice}" onclick="answer('story')">What kind of story is this?</button>
      <button class="btn ${selectedVoice}" onclick="answer('about')">What is the story about?</button>
      <button class="btn ${selectedVoice}" onclick="answer('for')">Who is this story for?</button>
      <button class="btn ${selectedVoice}" onclick="answer('where')">Where can I read it?</button>
      <button class="btn ${selectedVoice}" onclick="answer('author')">Who is the author?</button>
    </div>
  `;
  chatBox.innerHTML += questions;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function answer(type) {
  let response = "";

  if (selectedVoice === "saira") {
    response = {
      story: "Our story is a contemporary romantic fiction — emotionally driven, reflective, and rooted in human connection.",
      about: "It’s about love that grows quietly, shaped by timing, distance, and the choices we don’t always speak aloud.",
      for: "This story finds readers who value emotional depth and moments that linger.",
      where: "You can find our story as a Kindle eBook, Paperback, Hardcover, and Audio edition.",
      author: "The story was written by Mohan R., shaped by lived emotion and personal journeys."
    }[type];
  } else {
    response = {
      story: "It’s a contemporary romantic fiction — one that lives in the space between love and responsibility.",
      about: "It’s about me and Saira, and the weight of the choices that stayed long after the moments passed.",
      for: "This story speaks to those who sit with questions instead of rushing to answers.",
      where: "Our story is available across Kindle, Paperback, Hardcover, and Audio formats.",
      author: "Mohan R. wrote this as his debut — not to perfect love, but to tell it honestly."
    }[type];
  }

  chatBox.innerHTML += `<p>${response}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
