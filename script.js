/* =========================
   STATE
========================= */
const chatBody = document.getElementById("chatBody");
const dock = document.getElementById("questionDock");

let activeVoice = null;
let foundationalAnswered = new Set();
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
  autoScroll();
}

/* =========================
   VOICE SELECTION
========================= */
function selectVoice(v) {
  activeVoice = v;

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
    b.onclick = () => answerFoundational(q[1], b);
    dock.appendChild(b);
  });
}

function answerCharacter(item, btn) {

  // Remove question button
  btn.remove();

  characterAnswered++;

  // Show question in chat
  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p><strong>${item.q}</strong></p></div>`
  );

  // Show answer
  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message response ${selectedVoice}">
        <p>${item.a[selectedVoice]}</p>
     </div>`
  );

  scrollDown();

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockNextLayer();
  }

  if (characterAnswered === 15) {
    showAuthorInvite();
  }
}

/* =========================
   CHARACTER QUESTIONS
========================= */

const characterLayers = [
  /* KEEP YOUR EXISTING 3-LAYER ARRAY EXACTLY AS IT IS */
];

function unlockNextLayer() {
  if (currentLayer >= characterLayers.length) return;

  if (currentLayer > 0) {
    chatBody.insertAdjacentHTML(
      "beforeend",
      `<div class="message"><p>There’s more, if you’d like to continue.</p></div>`
    );
  }

  characterLayers[currentLayer].forEach(item => {
    const b = document.createElement("button");
    b.className = `btn ${activeVoice}`;
    b.textContent = item.q;
    b.onclick = () => answerCharacter(item, b);
    dock.appendChild(b);
  });

  currentLayer++;
  autoScroll();
}

function answerCharacter(item, btn) {
  btn.remove();  // ← CHANGED FROM disabled
  characterAnswered++;

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p>${item.a[activeVoice]}</p></div>`
  );

  autoScroll();

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockNextLayer();
  }

  if (characterAnswered === 15) {
    showAuthorInvitation();
  }
}

/* =========================
   AUTHOR INVITATION
========================= */

function showAuthorInvitation() {
  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message">
      <p>You’ve stayed with us until the end.</p>
      <p>If you’d like to write to the author, you’re welcome to. He sometimes shares digital copies with thoughtful readers.</p>
      <p><strong>wheretheskyremembersus@gmail.com</strong></p>
      <p><em>Before you leave, may I ask you three quiet reflections?</em></p>
    </div>`
  );

  dock.innerHTML = `
    <button class="btn ${activeVoice}" onclick="startReflection()">Yes</button>
    <button class="btn" onclick="declineReflection()">No</button>
  `;

  autoScroll();
}

/* =========================
   REFLECTION
========================= */

function declineReflection() {
  dock.innerHTML = "";
  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message">
      <p>${activeVoice === "saira" ? "Thank you for sitting with us." : "Thank you for staying."}</p>
      <button class="btn" onclick="returnToWebsite()">Return to the main site</button>
    </div>`
  );
  autoScroll();
}

/* KEEP YOUR EXISTING REFLECTION + SUBMIT FUNCTIONS UNCHANGED */

/* =========================
   START
========================= */

loadWelcome();
