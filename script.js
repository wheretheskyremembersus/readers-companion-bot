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
  chatBody.scrollTop = chatBody.scrollHeight;
}

function clearDock() {
  dock.innerHTML = "";
}

function returnToWebsite() {
  window.location.href = "https://wheretheskyremembersus.com";
}

/* =========================
   MESSAGE ENGINE (BUBBLES)
========================= */
function addMessage(text, type = "system", voice = null) {

  let bubbleClass = "bubble";

  if (type === "question") {
    bubbleClass += " question-bubble";
  } 
  else if (type === "answer") {
    bubbleClass += " answer-bubble " + voice;
  }

  const html = `
    <div class="message">
      <div class="${bubbleClass}">
        ${text}
      </div>
    </div>
  `;

  chatBody.insertAdjacentHTML("beforeend", html);
  autoScroll();
}

/* =========================
   INIT
========================= */
function loadWelcome() {

  chatBody.innerHTML = `
    <div class="message">
      <div class="bubble">
        <p>Hello.</p>
        <p>This is a quiet space.</p>
        <p>You can listen to our story through Saira or Aayan.</p>
        <p>Our story is a contemporary romantic fiction.</p>
        <p>When you’re ready, you can choose a voice.</p>
      </div>
    </div>
  `;

  clearDock();

  const sairaBtn = document.createElement("button");
  sairaBtn.className = "btn saira";
  sairaBtn.textContent = "Saira";
  sairaBtn.onclick = () => selectVoice("saira");

  const aayanBtn = document.createElement("button");
  aayanBtn.className = "btn aayan";
  aayanBtn.textContent = "Aayan";
  aayanBtn.onclick = () => selectVoice("aayan");

  dock.appendChild(sairaBtn);
  dock.appendChild(aayanBtn);

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

  addMessage(intro, "answer", voice);
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

  addMessage(q.text, "question");

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

  addMessage(replies[activeVoice][q.key], "answer", activeVoice);

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

  if (currentLayer > 0) {
    addMessage("There’s more, if you'd like to continue.");
  }

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

  addMessage(item.q, "question");
  addMessage(item.a[activeVoice], "answer", activeVoice);

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockLayer();
  }

  if (characterAnswered === 15) {
    showAuthorInvitation();
  }
}

/* =========================
   AUTHOR INVITE
========================= */

function showAuthorInvitation() {
  clearDock();

  addMessage("You’ve stayed with us until the end.");
  addMessage("If you’d like to write to the author, you’re welcome to.");
  addMessage("wheretheskyremembersus@gmail.com");
  addMessage("Before you leave, may I ask you three quiet reflections?");

  const yesBtn = document.createElement("button");
  yesBtn.className = "btn " + activeVoice;
  yesBtn.textContent = "Yes";
  yesBtn.onclick = startReflection;

  const noBtn = document.createElement("button");
  noBtn.className = "btn";
  noBtn.textContent = "No";
  noBtn.onclick = declineReflection;

  dock.appendChild(yesBtn);
  dock.appendChild(noBtn);
}

/* =========================
   REFLECTION
========================= */

function declineReflection() {
  clearDock();
  addMessage(activeVoice === "saira" ? "Thank you for sitting with us." : "Thank you for staying.");

  const backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "Return to the main site";
  backBtn.onclick = returnToWebsite;

  dock.appendChild(backBtn);
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
  addMessage(question);

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
  addMessage(activeVoice === "saira" ? "Thank you for sitting with us." : "Thank you for staying.");

  const backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "Return to the main site";
  backBtn.onclick = returnToWebsite;

  dock.appendChild(backBtn);
}

/* =========================
   START
========================= */

loadWelcome();
