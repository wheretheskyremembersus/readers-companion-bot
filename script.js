let selectedVoice = null;
let foundationalAnswered = new Set();
let characterAnswered = 0;
let currentLayer = 0;
let reflections = [];
let reflectionStep = 0;

const chatCard = document.getElementById("chatCard");
const chatBox = document.getElementById("chatBox");

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

  showFoundationalQuestions();
}

/* =========================
   FOUNDATIONAL QUESTIONS
========================= */

function showFoundationalQuestions() {
  const questions = `
    <div class="question-buttons">
      <button class="btn ${selectedVoice}" onclick="answerFoundational('story', this)">What kind of story is this?</button>
      <button class="btn ${selectedVoice}" onclick="answerFoundational('about', this)">What is the story about?</button>
      <button class="btn ${selectedVoice}" onclick="answerFoundational('for', this)">Who is this story for?</button>
      <button class="btn ${selectedVoice}" onclick="answerFoundational('where', this)">Where can I read it?</button>
      <button class="btn ${selectedVoice}" onclick="answerFoundational('author', this)">Who is the author?</button>
    </div>
  `;
  chatBox.innerHTML += questions;
  scrollDown();
}

function answerFoundational(type, btn) {
  btn.remove();
  foundationalAnswered.add(type);

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

  if (foundationalAnswered.size === 5) {
    unlockNextLayer();
  }
}

/* =========================
   CHARACTER QUESTIONS (15)
========================= */

const characterLayers = [
  // Layer 1
  [
    {
      q: "Where did you first meet?",
      a: {
        saira: "We met in a city that never really slows down — Mumbai. But the moment itself felt strangely still, as if everything else had stepped aside.",
        aayan: "It was supposed to be an ordinary encounter in Mumbai. It didn’t remain ordinary for long."
      }
    },
    {
      q: "What did you first notice?",
      a: {
        saira: "That he listened before he spoke. That stayed with me.",
        aayan: "She didn’t try to be impressive. She was simply present. That was rare."
      }
    },
    {
      q: "When did you start feeling it was different?",
      a: {
        saira: "It wasn’t sudden — not even in Venice. It was the quiet kind of knowing, the kind that grows without asking permission.",
        aayan: "I don’t think I believed in ‘the one.’ But I knew something had shifted."
      }
    },
    {
      q: "Who admitted their feelings first?",
      a: {
        saira: "I felt it first, but he was the one who said it. Though he had been carrying it just as long.",
        aayan: "I did. But I think she knew before I did. I tend to weigh words before I let them go."
      }
    },
    {
      q: "Which was the first city you were together in?",
      a: {
        saira: "Mumbai. It held our beginning — loud, restless, unforgettable.",
        aayan: "Mumbai. It didn’t give us space, but it gave us momentum."
      }
    }
  ],
  // Layer 2
  [
    {
      q: "Did you ever question your choice?",
      a: {
        saira: "Yes. Loving someone deeply doesn’t silence doubt — it makes it more complicated.",
        aayan: "I questioned the timing more than the feeling."
      }
    },
    {
      q: "Were you ever afraid of loving her?",
      a: {
        saira: "I was afraid of losing him, not loving him.",
        aayan: "Yes. Love asks you to give up control. That frightened me."
      }
    },
    {
      q: "What was your happiest moment together?",
      a: {
        saira: "It wasn’t dramatic. It was the night before we left Goa. Nothing extraordinary happened — except that we were both at peace.",
        aayan: "Silence. Sitting beside her at Triveni Ghat, without needing to explain anything."
      }
    },
    {
      q: "What moment stayed with you the longest?",
      a: {
        saira: "The moments when fear tried to take the place of love.",
        aayan: "The look she gave me when she understood what I couldn’t say."
      }
    },
    {
      q: "Which chapter feels closest to your heart?",
      a: {
        saira: "The one where everything felt possible. Though I carry a special tenderness for the chapters around our first trip to Manali, Spiti, and Shimla.",
        aayan: "The one where everything felt uncertain. Perhaps the London restaurant event — where silence spoke more than conversation."
      }
    }
  ],
  // Layer 3
  [
    {
      q: "Did you finally meet again?",
      a: {
        saira: "Some meetings don’t need witnesses to be real.",
        aayan: "Not all reunions look the way people expect."
      }
    },
    {
      q: "Is there more to your story?",
      a: {
        saira: "Stories don’t end. They change shape.",
        aayan: "What mattered didn’t disappear."
      }
    },
    {
      q: "Will there be a part two?",
      a: {
        saira: "Only if the story still has something honest to say. Some stories continue only when they’re meant to.",
        aayan: "Not everything needs a sequel. But some silences deserve one."
      }
    },
    {
      q: "If readers could learn one thing from you?",
      a: {
        saira: "To listen to what feels true — even if it complicates your life.",
        aayan: "That love isn’t always about arrival. Sometimes it’s about understanding."
      }
    },
    {
      q: "Do you still think about each other?",
      a: {
        saira: "Some people don’t leave your thoughts. They simply change rooms.",
        aayan: "Yes. Not with regret. With clarity."
      }
    }
  ]
];

function unlockNextLayer() {
  if (currentLayer >= characterLayers.length) return;

  chatBox.innerHTML += `<p><em>There’s more, if you’d like to continue.</em></p>`;

  const buttons = characterLayers[currentLayer]
    .map(item =>
      `<button class="btn ${selectedVoice}" onclick="answerCharacter('${item.q.replace(/'/g,"\\'")}', this)">
        ${item.q}
      </button>`
    )
    .join("");

  chatBox.innerHTML += `<div class="question-buttons">${buttons}</div>`;

  currentLayer++;
  scrollDown();
}

function answerCharacter(questionText, btn) {
  btn.remove();
  characterAnswered++;

  const layerIndex = currentLayer - 1;
  const question = characterLayers[layerIndex].find(q => q.q === questionText);

  chatBox.innerHTML += `<p class="response ${selectedVoice}">${question.a[selectedVoice]}</p>`;
  scrollDown();

  if (characterAnswered === 5 || characterAnswered === 10) {
    unlockNextLayer();
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
