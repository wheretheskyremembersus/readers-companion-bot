/* =========================
   STATE
========================= */
const chatBody = document.getElementById("chatBody");
const dock = document.getElementById("questionDock");

let activeVoice = null;
let foundationalAnswered = 0;
let characterAnswered = 0;
let currentLayer = 0;
let reflections = [];
let reflectionStep = 0;

/* =========================
   HELPERS
========================= */
function autoScroll() {
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

function returnToWebsite() {
  window.location.href = "https://wheretheskyremembersus.com";
}

/* =========================
   INIT
========================= */
function loadWelcome() {
  chatBody.innerHTML = `
    <div class="message">
      <p>Hello.</p>
      <p>This is a quiet space.</p>
      <p>You can listen to our story through Saira or Aayan.</p>
      <p>Our story is a contemporary romantic fiction.</p>
      <p>When you’re ready, you can choose a voice.</p>
    </div>
  `;

  dock.innerHTML = `
    <button class="btn saira" onclick="selectVoice('saira')">Saira</button>
    <button class="btn aayan" onclick="selectVoice('aayan')">Aayan</button>
  `;
}

/* =========================
   VOICE SELECTION
========================= */
function selectVoice(v) {
  activeVoice = v;

  dock.innerHTML = "";

  const intro =
    v === "saira"
      ? "Hello, this is Saira. I don’t believe stories are meant to be explained too quickly — but I can sit with you and share what ours carries."
      : "Hello. This is Aayan. I don’t speak easily about what stayed behind, but I can tell you what it asked of us.";

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p><strong>${intro}</strong></p></div>`
  );

  showFoundational();
  autoScroll();
}

/* =========================
   FOUNDATIONAL QUESTIONS
========================= */
function showFoundational() {
  const questions = [
    ["What kind of story is this?", "story"],
    ["What is the story about?", "about"],
    ["Who is this story for?", "for"],
    ["Where can I read it?", "where"],
    ["Who is the author?", "author"]
  ];

  dock.innerHTML = "";

  questions.forEach(q => {
    const b = document.createElement("button");
    b.className = `btn ${activeVoice}`;
    b.textContent = q[0];
    b.onclick = () => answerFoundational(q[0], q[1], b);
    dock.appendChild(b);
  });
}

function answerFoundational(questionText, type, btn) {
  btn.remove();
  foundationalAnswered++;

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p><strong>${questionText}</strong></p></div>`
  );

  const replies = {
    saira: {
      story: "Our story is a contemporary romantic fiction, shaped by moments that arrive quietly and stay longer than expected.",
      about: "It’s about me and Aayan — about love, distance, memory, and the choices we carry with us.",
      for: "This story often finds readers who value reflection, atmosphere, and emotional honesty.",
      where: "You can read it as a Kindle eBook, Paperback, Hardcover, or Audio edition.",
      author: "Mohan R. wrote this as his debut novel, drawing from lived emotion, travel, and quiet observation."
    },
    aayan: {
      story: "It’s a contemporary romantic fiction, but it stays where love and responsibility pull in different directions.",
      about: "It’s about timing. About knowing something matters deeply, and still choosing carefully.",
      for: "This story speaks to readers who understand that not every connection arrives neatly or resolves cleanly.",
      where: "The story is available in digital, print, and audio formats.",
      author: "Mohan R. wrote this story to sit honestly with complicated love and unanswered questions."
    }
  };

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p class="${activeVoice}">${replies[activeVoice][type]}</p></div>`
  );

  autoScroll();

  if (foundationalAnswered === 5) {
    unlockLayer();
  }
}

/* =========================
   CHARACTER LAYERS
========================= */

const layers = [...YOUR EXISTING LAYERS ARRAY HERE...];

function unlockLayer() {
  if (currentLayer >= layers.length) return;

  dock.innerHTML = "";

  layers[currentLayer].forEach(q => {
    const b = document.createElement("button");
    b.className = `btn ${activeVoice}`;
    b.textContent = q[0];
    b.onclick = () => answerCharacter(q[0], q[1], b);
    dock.appendChild(b);
  });

  currentLayer++;
}

function answerCharacter(questionText, answers, btn) {
  btn.remove();
  characterAnswered++;

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p><strong>${questionText}</strong></p></div>`
  );

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p class="${activeVoice}">${answers[activeVoice]}</p></div>`
  );

  autoScroll();

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockLayer();
  }

  if (characterAnswered === 15) {
    showAuthorInvite();
  }
}

/* =========================
   AUTHOR INVITE
========================= */

function showAuthorInvite() {
  dock.innerHTML = "";

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message">
      <p>You’ve stayed with us until the end.</p>
      <p>If you’d like to write to the author, you’re welcome to.</p>
      <p><strong>wheretheskyremembersus@gmail.com</strong></p>
      <button class="btn" onclick="returnToWebsite()">Return to the main site</button>
    </div>`
  );

  autoScroll();
}

loadWelcome();
