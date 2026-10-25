
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
