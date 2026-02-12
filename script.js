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

function addMessage(text, bold = false) {
  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message"><p>${bold ? "<strong>" + text + "</strong>" : text}</p></div>`
  );
  autoScroll();
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
  dock.innerHTML = "";

  const intro =
    v === "saira"
      ? "Hello, this is Saira. I don’t believe stories are meant to be explained too quickly — but I can sit with you and share what ours carries."
      : "Hello. This is Aayan. I don’t speak easily about what stayed behind, but I can tell you what it asked of us.";

  addMessage(intro, true);
  showFoundational();
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

  questions.forEach(([text, type]) => {
    const b = document.createElement("button");
    b.className = `btn ${activeVoice}`;
    b.textContent = text;
    b.onclick = () => answerFoundational(type, b);
    dock.appendChild(b);
  });
}

function answerFoundational(type, btn) {
  const questionText = btn.textContent;
  btn.remove(); // Remove from dock
  foundationalAnswered.add(type);

  addMessage(questionText, true);

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

  addMessage(replies[activeVoice][type]);

  if (foundationalAnswered.size === 5) {
    unlockNextLayer();
  }
}

/* =========================
   CHARACTER LAYERS
========================= */

const characterLayers = /* KEEP YOUR EXISTING characterLayers ARRAY HERE */ characterLayers;

function unlockNextLayer() {
  if (currentLayer >= characterLayers.length) return;

  if (currentLayer > 0) {
    addMessage("There’s more, if you'd like to continue.");
  }

  dock.innerHTML = "";

  characterLayers[currentLayer].forEach(item => {
    const b = document.createElement("button");
    b.className = `btn ${activeVoice}`;
    b.textContent = item.q;
    b.onclick = () => answerCharacter(item, b);
    dock.appendChild(b);
  });

  currentLayer++;
}

function answerCharacter(item, btn) {
  const questionText = btn.textContent;
  btn.remove(); // Remove from dock
  characterAnswered++;

  addMessage(questionText, true);
  addMessage(item.a[activeVoice]);

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
  dock.innerHTML = "";

  addMessage("You’ve stayed with us until the end.");
  addMessage("If you’d like to write to the author, you’re welcome to. He sometimes shares digital copies with thoughtful readers.");
  addMessage("wheretheskyremembersus@gmail.com", true);
  addMessage("Before you leave, may I ask you three quiet reflections?", true);

  dock.innerHTML = `
    <button class="btn ${activeVoice}" onclick="startReflection()">Yes</button>
    <button class="btn" onclick="declineReflection()">No</button>
  `;
}

/* =========================
   REFLECTION
========================= */

function declineReflection() {
  dock.innerHTML = "";
  addMessage(activeVoice === "saira" ? "Thank you for sitting with us." : "Thank you for staying.");
  dock.innerHTML = `<button class="btn" onclick="returnToWebsite()">Return to the main site</button>`;
}

function startReflection() {
  reflections = [];
  reflectionStep = 0;
  nextReflection();
}

function nextReflection() {
  const sets = {
    saira: [
      ["How closely did this story stay with you?", ["🌫️","🌱","💛","🌙","✨"]],
      ["How clearly did the emotions feel?", ["🌫️","🌱","💛","🌙","✨"]],
      ["How drawn do you feel to continue?", ["🚶","👀","💫","❤️","📖"]]
    ],
    aayan: [
      ["How clearly did the emotional world reveal itself to you?", ["🌑","🌘","🌗","🌕","☀️"]],
      ["How steady did the story feel?", ["🌑","🌘","🌗","🌕","☀️"]],
      ["How drawn do you feel to continue reading?", ["🚶","👀","💫","❤️","📖"]]
    ]
  };

  if (reflectionStep === 3) {
    submitReflection();
    return;
  }

  const [q, emojis] = sets[activeVoice][reflectionStep];
  addMessage(q);

  dock.innerHTML = "";

  emojis.forEach(e => {
    const b = document.createElement("button");
    b.className = `btn ${activeVoice}`;
    b.textContent = e;
    b.onclick = () => {
      reflections.push(e);
      reflectionStep++;
      nextReflection();
    };
    dock.appendChild(b);
  });
}

/* =========================
   SUBMIT
========================= */

function submitReflection() {
  document.getElementById("formVoice").value = activeVoice;
  document.getElementById("r1").value = reflections[0];
  document.getElementById("r2").value = reflections[1];
  document.getElementById("r3").value = reflections[2];
  document.getElementById("formTime").value = new Date().toISOString();
  document.getElementById("reflectionForm").submit();

  dock.innerHTML = "";
  addMessage(activeVoice === "saira" ? "Thank you for sitting with us." : "Thank you for staying.");
  dock.innerHTML = `<button class="btn" onclick="returnToWebsite()">Return to the main site</button>`;
}

/* =========================
   START
========================= */

loadWelcome();
