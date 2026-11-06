
// ── LOGIN GATE ──
const ALLOWED_USERS = [
    { name: "raj", passkey: "dabbo" },
    { name: "rakhi", passkey: "dabbo" }
];

const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const loginName = document.getElementById("loginName");
const loginPasskey = document.getElementById("loginPasskey");
const loginFeedback = document.getElementById("loginFeedback");
const siteContent = document.getElementById("siteContent");
const loginBox = document.getElementById("loginBox");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const enteredName = loginName.value.trim().toLowerCase();
    const enteredPasskey = loginPasskey.value.trim().toLowerCase();

    const isAllowed = ALLOWED_USERS.some(
        user => user.name === enteredName && user.passkey === enteredPasskey
    );

    if (isAllowed) {
        loginOverlay.classList.add("hide");
        siteContent.style.display = "block";
        setTimeout(() => loginOverlay.remove(), 700);
    } else {
        loginFeedback.textContent = "Wrong name or passkey. Try again. ♡";
        loginBox.classList.remove("shake");
        void loginBox.offsetWidth; // force reflow so shake re-triggers
        loginBox.classList.add("shake");
        loginPasskey.value = "";
        loginPasskey.focus();
    }
});

const CONFIG = {
    partner: "Dabboo Devi",
    yourName: "Raj",
    anniversary: "2023-11-07",
    anniversaryDate: "2026-11-07",
    secretPassword: "Update"
};

// Smooth reveal animation
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(section => {
    revealObserver.observe(section);
});

// Reveal the second part of the love letter
const letterBtn = document.getElementById("letterBtn");
const hiddenLetter = document.getElementById("hiddenLetter");

letterBtn.addEventListener("click", () => {
    const isOpen = hiddenLetter.classList.toggle("show");

    letterBtn.textContent = isOpen
        ? "CLOSE THIS LITTLE NOTE ↗"
        : "A LITTLE MORE, JUST FOR YOU ↗";

    if (isOpen) {
        hiddenLetter.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        burstHearts(window.innerWidth / 2, window.innerHeight / 2, 8);
    }
});

// Secret password surprise
const secretForm = document.getElementById("secretForm");
const passwordInput = document.getElementById("password");
const secretMessage = document.getElementById("secretMessage");
const feedback = document.getElementById("feedback");

secretForm.addEventListener("submit", event => {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim().toLowerCase();

    if (enteredPassword === CONFIG.secretPassword.toLowerCase()) {
        secretMessage.classList.add("show");
        feedback.textContent = "You found your little surprise, my love. ♥";
        passwordInput.value = "";

        burstHearts(
            window.innerWidth / 2,
            window.innerHeight * 0.65,
            22
        );

        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    } else {
        feedback.textContent = "Not quite, love. Try again. ♡";
        passwordInput.select();
    }
});

// Background music toggle
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.textContent = "♫ MUSIC ON · PAUSE";
        } catch (error) {
            musicBtn.textContent = "ADD MUSIC.MP3";
            feedback.textContent =
                "Add a music.mp3 file beside index.html first.";
        }
    } else {
        music.pause();
        musicBtn.textContent = "♫ PLAY OUR SONG";
    }
});

// Floating hearts animation
function burstHearts(x, y, count = 15) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement("span");

        heart.className = "floating-heart";
        heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

        heart.style.left =
            `${x + (Math.random() - 0.5) * 180}px`;

        heart.style.top =
            `${y + (Math.random() - 0.5) * 50}px`;

        heart.style.animationDelay =
            `${Math.random() * 0.4}s`;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 2400);
    }
}

// Final heart button
document.getElementById("heartBtn").addEventListener("click", event => {
    const rect = event.currentTarget.getBoundingClientRect();

    burstHearts(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        30
    );
});

// Calculate days together
const start = new Date(CONFIG.anniversary + "T00:00:00");
const today = new Date();

today.setHours(0, 0, 0, 0);

const daysTogether = Math.max(
    0,
    Math.floor((today - start) / (1000 * 60 * 60 * 24))
);

document.getElementById("daysTogether").textContent =
    `${daysTogether.toLocaleString()} DAYS OF US AND COUNTING ♥`;

// Anniversary countdown on the page title
const anniversary = new Date(CONFIG.anniversaryDate + "T00:00:00");
const daysUntil = Math.ceil(
    (anniversary - today) / (1000 * 60 * 60 * 24)
);

if (daysUntil > 0) {
    document.title = `For Dabboo Devi ♥ ${daysUntil} days to our anniversary`;
} else {
    document.title = "For Dabboo Devi ♥ Three Years of Us";
}


// ROYAL LOVE LETTER INTERACTION

const royalEnvelope = document.getElementById("envelopeWrapper");
const royalButton = document.getElementById("openRoyalLetter");
const letterHint = document.getElementById("letterHint");

let royalLetterOpened = false;

royalButton.addEventListener("click", () => {

  if (!royalLetterOpened) {

    royalEnvelope.classList.add("open");
    royalLetterOpened = true;

    royalButton.innerHTML = "♥ CLOSE MY LETTER ♥";
    letterHint.textContent =
      "Every word comes straight from my heart.";

    burstHearts(
      window.innerWidth / 2,
      window.innerHeight / 2,
      20
    );

    setTimeout(() => {
      document.getElementById("royalLetter")
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    }, 500);

  } else {

    royalEnvelope.classList.remove("open");
    royalLetterOpened = false;

    royalButton.innerHTML =
      "♥ OPEN YOUR LETTER ♥";

    letterHint.textContent =
      "A little piece of my heart, just for you.";

  }

});


const FUTURE_LETTER_DATE = new Date("2027-11-07T00:00:00+05:30").getTime();

// Change this to your own secret passkey.
const FUTURE_LETTER_PASSKEY = "07NOVFOREVER";

const letter = document.getElementById("futureLetterContent");
const passkeyInput = document.getElementById("futurePasskey");
const passkeyMessage = document.getElementById("passkeyMessage");
const unlockButton = document.getElementById("unlockFutureLetter");

let letterOpened = false;

function openFutureLetter(message) {
  if (letterOpened) return;

  letterOpened = true;

  letter.hidden = false;
  letter.setAttribute("aria-hidden", "false");

  passkeyMessage.textContent = message;

  document.getElementById("countdownMessage").textContent =
    "The wait is over. Your letter is finally here. ❤️";

  document.querySelector(".countdown-heading").textContent =
    "A year of waiting, and now the moment has arrived.";

  letter.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function updateFutureCountdown() {
  const now = Date.now();
  const remaining = FUTURE_LETTER_DATE - now;

  // Main unlock condition: the date has arrived.
  if (remaining <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    openFutureLetter("Unlocked automatically on the special date. ❤️");
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

// Optional early unlock using the passkey.
function unlockWithPasskey() {
  const enteredPasskey = passkeyInput.value.trim();

  if (enteredPasskey.toUpperCase() === FUTURE_LETTER_PASSKEY.toUpperCase()) {
    openFutureLetter("You found the secret way in. ❤️");
  } else {
    passkeyMessage.textContent = "That's not the right passkey. Try again, my love.";
  }
}

unlockButton.addEventListener("click", unlockWithPasskey);

passkeyInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockWithPasskey();
  }
});

// Start immediately and refresh every second.
updateFutureCountdown();
const futureLetterTimer = setInterval(() => {
  if (letterOpened) {
    clearInterval(futureLetterTimer);
    return;
  }

  updateFutureCountdown();
}, 1000);
