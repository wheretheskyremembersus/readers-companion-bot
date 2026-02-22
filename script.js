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
      : activeVoice === "Ayaan"
      ? "Ayaan-msg"
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
    "You can listen to our story through Saira or Ayaan.",
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
    <button class="btn Ayaan" onclick="selectVoice('Ayaan')">Ayaan</button>
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
      : "Hello. This is Ayaan. I don’t speak easily about what stayed behind, but I can tell you what it asked of us.";

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
    story: "Our story is a contemporary romantic fiction — but it moves quietly. It lingers in moments that don’t seem significant at first, and then refuses to leave you. It’s less about grand declarations, and more about what remains unsaid.",

    about: "It’s about me and Ayaan — about the kind of love that feels certain, even when life around it isn’t. It’s about distance that isn’t always physical, and choices that seem small until they change everything. Some stories are built on moments. Ours was built on hesitation.",

    for: "This story finds people who have felt something deeply and didn’t know what to do with it. The ones who replay conversations long after they’ve ended. If you’ve ever stood between love and fear — you already understand us.",

    where: "You can find our story in whatever form feels closest to you — as a Kindle eBook, in paperback, hardcover, or even as an audiobook. Some prefer to hold it. Some prefer to listen. However you choose, the story remains the same.",

    author: "Mohan R. wrote this as his debut novel. He didn’t try to make it loud — only honest. I think he trusted silence as much as dialogue, and allowed the pauses to speak."
  },

  Ayaan: {
    story: "It’s a contemporary romantic fiction, but it lives in the space between love and responsibility. It’s about choices that don’t feel urgent — until they are. And about how easily silence can become distance.",

    about: "It’s about timing — but not in the simple way people think. The feeling was never uncertain. What faltered was courage, and the belief that love would wait. It’s about how easily something real can slip into memory if you hesitate too long.",

    for: "It’s for those who believe feelings can wait — until they realise they can’t. For people who have chosen responsibility over vulnerability, and wondered about the cost later. If you’ve ever hesitated when it mattered most, this story will feel familiar.",

    where: "It’s available in digital, print, and audio formats. The format doesn’t change what it carries — only how you meet it. Some stories are read. Some are heard. Ours survives both.",

    author: "Mohan R. wrote this story. Not to explain everything — but to sit with what lingers after love shifts. Some things are written for applause. This wasn’t one of them."
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

  // Show continuation message only after first layer
  if (characterAnswered > 0) {
    addVoiceMessage("There’s more, if you’d like to continue.");
  }

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
  // Remove question from dock
  btn.remove();

  // Show user question in proper grey bubble
  addUserMessage(item.q);

  // Show character reply in correct styled bubble
  addVoiceMessage(item.a[activeVoice]);

  characterAnswered++;

  // After 5 and 10 questions → unlock next layer
  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockLayer();
  }

  // After 15 questions → move to author section
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
    Ayaan: [
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
