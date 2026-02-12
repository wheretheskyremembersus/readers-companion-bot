<script>
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

function addUserMessage(text) {
  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message user">
        <div class="bubble"><strong>${text}</strong></div>
     </div>`
  );
  autoScroll();
}

function addVoiceMessage(text) {
  const side =
    activeVoice === "saira"
      ? "saira-msg"
      : activeVoice === "aayan"
      ? "aayan-msg"
      : "";

  chatBody.insertAdjacentHTML(
    "beforeend",
    `<div class="message ${side}">
        <div class="bubble">${text}</div>
     </div>`
  );
  autoScroll();
}

function clearDock() {
  dock.innerHTML = "";
}

function returnToWebsite() {
  window.location.href = "https://wheretheskyremembersus.com";
}

/* =========================
   INIT
========================= */
function loadWelcome() {
  chatBody.innerHTML = "";

  // FULL RESET
  activeVoice = null;
  foundationalAnswered = 0;
  characterAnswered = 0;
  currentLayer = 0;
  reflections = [];
  reflectionStep = 0;

  const welcomeMessages = [
    "Hello.",
    "This is a quiet space.",
    "You can listen to our story through Saira or Aayan.",
    "Our story is a contemporary romantic fiction.",
    "When you’re ready, you can choose a voice."
  ];

  welcomeMessages.forEach(text => {
    chatBody.insertAdjacentHTML(
      "beforeend",
      `<div class="message">
         <div class="bubble" style="background:#f2f2f2;border-radius:14px;">
           ${text}
         </div>
       </div>`
    );
  });

  clearDock();

  dock.innerHTML = `
    <button class="btn saira" onclick="selectVoice('saira')">Saira</button>
    <button class="btn aayan" onclick="selectVoice('aayan')">Aayan</button>
  `;

  autoScroll();
}

/* =========================
   VOICE SELECTION
========================= */
function selectVoice(voice) {
  activeVoice = voice;
  clearDock();

  const intro =
    voice === "saira"
      ? "Hello, this is Saira. I don’t believe stories are meant to be explained too quickly — but I can sit with you and share what ours carries."
      : "Hello. This is Aayan. I don’t speak easily about what stayed behind, but I can tell you what it asked of us.";

  addVoiceMessage(intro);
  showFoundational();
}

/* =========================
   FOUNDATIONAL
========================= */
function showFoundational() {
  clearDock();

  const questions = [
    { text: "What kind of story is this?", key: "story" },
    { text: "What is the story about?", key: "about" },
    { text: "Who is this story for?", key: "for" },
    { text: "Where can I read it?", key: "where" },
    { text: "Who is the author?", key: "author" }
  ];

  questions.forEach(q => {
    const btn = document.createElement("button");
    btn.className = "btn " + activeVoice;
    btn.textContent = q.text;
    btn.onclick = () => answerFoundational(q, btn);
    dock.appendChild(btn);
  });
}

function answerFoundational(q, btn) {
  btn.remove();
  foundationalAnswered++;

  addUserMessage(q.text);

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

  addVoiceMessage(replies[activeVoice][q.key]);

  if (foundationalAnswered === 5) {
    unlockLayer();
  }
}

/* =========================
   CHARACTER LAYERS
========================= */

function unlockLayer() {
  if (currentLayer >= characterLayers.length) return;

  clearDock();

  addVoiceMessage("There’s more, if you’d like to continue.");

  dock.innerHTML = `
    <button class="btn ${activeVoice}" onclick="showNextLayer()">Yes</button>
    <button class="btn" onclick="loadWelcome()">No</button>
  `;
}

function showNextLayer() {
  clearDock();

  characterLayers[currentLayer].forEach(item => {
    const btn = document.createElement("button");
    btn.className = "btn " + activeVoice;
    btn.textContent = item.q;
    btn.onclick = () => answerCharacter(item, btn);
    dock.appendChild(btn);
  });

  currentLayer++;
}

function answerCharacter(item, btn) {
  btn.remove();
  characterAnswered++;

  addUserMessage(item.q);
  addVoiceMessage(item.a[activeVoice]);

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockLayer(); // ✅ FIXED
  }

  if (characterAnswered === 15) {
    showAuthorInvitation();
  }
}

/* =========================
   AUTHOR INVITATION
========================= */
function showAuthorInvitation() {
  clearDock();

  addVoiceMessage("You’ve stayed with us until the end.");
  addVoiceMessage("If you’d like to write to the author, you’re welcome to.");
  addVoiceMessage("wheretheskyremembersus@gmail.com");
  addVoiceMessage("Before you leave, may I ask you three quiet reflections?");

  dock.innerHTML = `
    <button class="btn ${activeVoice}" onclick="startReflection()">Yes</button>
    <button class="btn" onclick="declineReflection()">No</button>
  `;
}

/* =========================
   REFLECTION
========================= */
function declineReflection() {
  clearDock();

  addVoiceMessage(
    activeVoice === "saira"
      ? "Thank you for sitting with us."
      : "Thank you for staying."
  );

  dock.innerHTML = `
    <button class="btn" onclick="returnToWebsite()">Return to the main site</button>
  `;
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

  clearDock();

  const [question, emojis] = sets[activeVoice][reflectionStep];
  addVoiceMessage(question);

  emojis.forEach(e => {
    const btn = document.createElement("button");
    btn.className = "btn " + activeVoice;
    btn.textContent = e;
    btn.onclick = () => {
      reflections.push(e);
      reflectionStep++;
      nextReflection();
    };
    dock.appendChild(btn);
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

  clearDock();

  addVoiceMessage(
    activeVoice === "saira"
      ? "Thank you for sitting with us."
      : "Thank you for staying."
  );

  dock.innerHTML = `
    <button class="btn" onclick="returnToWebsite()">Return to the main site</button>
  `;
}

/* =========================
   START
========================= */
loadWelcome();
</script>
