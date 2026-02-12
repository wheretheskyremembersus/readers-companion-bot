let selectedVoice = null;
let foundationalAnswered = 0;
let characterAnswered = 0;
let currentLayer = 0;

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

const layers = [

  // LAYER 1
  [
    ["Where did you first meet?",
      {
        saira: "We met in a city that never really slows down — Mumbai. But the moment itself felt strangely still, as if everything else had stepped aside.",
        aayan: "It was supposed to be an ordinary encounter in Mumbai. It didn’t remain ordinary for long."
      }
    ],
    ["What did you first notice?",
      {
        saira: "That he listened before he spoke. That stayed with me.",
        aayan: "She didn’t try to be impressive. She was simply present. That was rare."
      }
    ],
    ["When did you start feeling it was different?",
      {
        saira: "It wasn’t sudden — not even in Venice. It was the quiet kind of knowing, the kind that grows without asking permission.",
        aayan: "I don’t think I believed in ‘the one.’ But I knew something had shifted."
      }
    ],
    ["Who admitted their feelings first?",
      {
        saira: "I felt it first, but he was the one who said it. Though he had been carrying it just as long.",
        aayan: "I did. But I think she knew before I did. I tend to weigh words before I let them go."
      }
    ],
    ["Which was the first city you were together in?",
      {
        saira: "Mumbai. It held our beginning — loud, restless, unforgettable.",
        aayan: "Mumbai. It didn’t give us space, but it gave us momentum."
      }
    ]
  ],

  // LAYER 2
  [
    ["Did you ever question your choice?",
      {
        saira: "Yes. Loving someone deeply doesn’t silence doubt — it makes it more complicated.",
        aayan: "I questioned the timing more than the feeling."
      }
    ],
    ["Were you ever afraid of loving her?",
      {
        saira: "I was afraid of losing him, not loving him.",
        aayan: "Yes. Love asks you to give up control. That frightened me."
      }
    ],
    ["What was your happiest moment together?",
      {
        saira: "It wasn’t dramatic. It was the night before we left Goa. Nothing extraordinary happened — except that we were both at peace.",
        aayan: "Silence. Sitting beside her at Triveni Ghat, without needing to explain anything."
      }
    ],
    ["What moment stayed with you the longest?",
      {
        saira: "The moments when fear tried to take the place of love.",
        aayan: "The look she gave me when she understood what I couldn’t say."
      }
    ],
    ["Which chapter feels closest to your heart?",
      {
        saira: "The one where everything felt possible. Though I carry a special tenderness for the chapters around our first trip to Manali, Spiti, and Shimla.",
        aayan: "The one where everything felt uncertain. Perhaps the London restaurant event — where silence spoke more than conversation."
      }
    ]
  ],

  // LAYER 3
  [
    ["Did you finally meet again?",
      {
        saira: "Some meetings don’t need witnesses to be real.",
        aayan: "Not all reunions look the way people expect."
      }
    ],
    ["Is there more to your story?",
      {
        saira: "Stories don’t end. They change shape.",
        aayan: "What mattered didn’t disappear."
      }
    ],
    ["Will there be a part two?",
      {
        saira: "Only if the story still has something honest to say. Some stories continue only when they’re meant to.",
        aayan: "Not everything needs a sequel. But some silences deserve one."
      }
    ],
    ["If readers could learn one thing from you?",
      {
        saira: "To listen to what feels true — even if it complicates your life.",
        aayan: "That love isn’t always about arrival. Sometimes it’s about understanding."
      }
    ],
    ["Do you still think about each other?",
      {
        saira: "Some people don’t leave your thoughts. They simply change rooms.",
        aayan: "Yes. Not with regret. With clarity."
      }
    ]
  ]
];

function unlockLayer() {
  if (currentLayer >= layers.length) return;

  chatBox.innerHTML += `<p><em>There’s more, if you’d like to continue.</em></p>`;

  let buttons = layers[currentLayer]
    .map(q =>
      `<button class="btn ${selectedVoice}" onclick="answerCharacter(${currentLayer}, '${q[0].replace(/'/g,"\\'")}', this)">
        ${q[0]}
      </button>`
    )
    .join("");

  chatBox.innerHTML += `<div class="question-buttons">${buttons}</div>`;
  currentLayer++;
  scrollDown();
}

function answerCharacter(layerIndex, questionText, btn) {
  btn.remove();
  characterAnswered++;

  const question = layers[layerIndex].find(q => q[0] === questionText);

  chatBox.innerHTML += `<p class="response ${selectedVoice}">${question[1][selectedVoice]}</p>`;
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
