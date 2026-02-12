let selectedVoice = null;
let foundationalAnswered = 0;
let characterAnswered = 0;
let currentLayer = 0;

const chatCard = document.getElementById("chatCard");
const chatBox = document.getElementById("chatBody");

function toggleChat() {
  chatCard.style.display =
    chatCard.style.display === "flex" ? "none" : "flex";
}

function selectVoice(voice) {
  selectedVoice = voice;

  const intro =
    voice === "saira"
      ? "Hello, this is Saira. I don’t believe stories are meant to be explained too quickly — but I can sit with you and share what ours carries."
      : "Hello. This is Aayan. I don’t speak easily about what stayed behind, but I can tell you what it asked of us.";

  chatBox.innerHTML += `<p><strong>${intro}</strong></p>`;
  showFoundational();
  scrollDown();
}

/* =========================
   FOUNDATIONAL
========================= */

function showFoundational() {
  const questions = [
    ["What kind of story is this?", "story"],
    ["What is the story about?", "about"],
    ["Who is this story for?", "for"],
    ["Where can I read it?", "where"],
    ["Who is the author?", "author"]
  ];

  let buttons = questions
    .map(q => `<button class="btn ${selectedVoice}" onclick="answerFoundational('${q[1]}', this)">${q[0]}</button>`)
    .join("");

  chatBox.innerHTML += `<div class="question-buttons">${buttons}</div>`;
}

function answerFoundational(type, btn) {
  btn.remove();
  foundationalAnswered++;

  const replies = {
    saira: {
      story: "Our story is a contemporary romantic fiction — emotionally driven, reflective, and rooted in human connection.",
      about: "It’s about me and Aayan — about love, distance, memory, and the choices we carry with us.",
      for: "This story often finds readers who value reflection, atmosphere, and emotional honesty.",
      where: "You can read it as a Kindle eBook, Paperback, Hardcover, or Audio edition.",
      author: "Mohan R. wrote this as his debut novel, drawing from lived emotion, travel, and quiet observation."
    },
    aayan: {
      story: "It’s a contemporary romantic fiction — one that lives in the space between love and responsibility.",
      about: "It’s about timing. About knowing something matters deeply, and still choosing carefully.",
      for: "This story speaks to readers who understand that not every connection arrives neatly or resolves cleanly.",
      where: "The story is available in digital, print, and audio formats.",
      author: "Mohan R. wrote this story to sit honestly with complicated love and unanswered questions."
    }
  };

  chatBox.innerHTML += `<p class="response ${selectedVoice}">${replies[selectedVoice][type]}</p>`;
  scrollDown();

  if (foundationalAnswered === 5) {
    unlockLayer();
  }
}

/* =========================
   CHARACTER LAYERS
========================= */

const layers = [ /* your exact 3 layers here — unchanged */ ];

/* IMPORTANT: Do not modify your layers array */

function unlockLayer() {
  if (currentLayer >= layers.length) return;

  if (currentLayer > 0) {
    chatBox.innerHTML += `<p><em>There’s more, if you’d like to continue.</em></p>`;
  }

  let buttons = layers[currentLayer]
    .map(q =>
      `<button class="btn ${selectedVoice}" onclick="answerCharacter(this, '${q[0].replace(/'/g,"\\'")}')">
        ${q[0]}
      </button>`
    )
    .join("");

  chatBox.innerHTML += `<div class="question-buttons">${buttons}</div>`;

  currentLayer++;
  scrollDown();
}

function answerCharacter(btn, questionText) {

  btn.remove();
  characterAnswered++;

  // Find question across all layers safely
  let foundAnswer = null;

  for (let layer of layers) {
    for (let q of layer) {
      if (q[0] === questionText) {
        foundAnswer = q[1][selectedVoice];
        break;
      }
    }
  }

  if (foundAnswer) {
    chatBox.innerHTML += `<p class="response ${selectedVoice}">${foundAnswer}</p>`;
  }

  scrollDown();

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockLayer();
  }

  if (characterAnswered === 15) {
    showAuthorInvite();
  }
}

function showAuthorInvite() {
  chatBox.innerHTML += `
    <p>You’ve stayed with us until the end.</p>
    <p>If you’d like to write to the author, you’re welcome to. He sometimes shares digital copies with thoughtful readers.</p>
    <p><strong>wheretheskyremembersus@gmail.com</strong></p>
  `;
  scrollDown();
}

function scrollDown() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
