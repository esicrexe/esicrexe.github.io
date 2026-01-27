// DOM Elements
const gallerySection = document.getElementById('gallery-section');
const proposalSection = document.getElementById('proposal-section');
const nextBtn = document.getElementById('nextBtn');
const memoryImg = document.getElementById('memory-img');
const memoryText = document.getElementById('memory-text');

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('success-message');

// Confetti configuration
const jsConfetti = window.confetti;

// Memory Lane Data
// REPLACE THESE URLS AND TEXTS WITH YOUR OWN!
const memories = [
    {
        img: "https://media.tenor.com/_MvX3qYk1lUAAAAC/peach-goma-peach-and-goma.gif",
        text: "Ever since we met... 💕"
    },
    {
        img: "https://media.tenor.com/PZQM89d7b4AAAAAi/mochi-cat-peach-goma.gif",
        text: "... you have always shown me the beauty of love 💖🌸."
    },
    {
        img: "https://media.tenor.com/2v8yR8_h5sMAAAAi/mochi-peach.gif",
        text: "✨✨✨"
    }
];

let currentMemoryIndex = 0;

// Initialize first memory
function showMemory(index) {
    // Add fade-out effect
    memoryImg.style.opacity = '0';
    memoryText.style.opacity = '0';

    setTimeout(() => {
        memoryImg.src = memories[index].img;
        memoryText.textContent = memories[index].text;

        // Fade in
        memoryImg.style.opacity = '1';
        memoryText.style.opacity = '1';
    }, 200);
}

// Start the show
showMemory(currentMemoryIndex);

// Next Button Click
nextBtn.addEventListener('click', () => {
    currentMemoryIndex++;

    if (currentMemoryIndex < memories.length) {
        showMemory(currentMemoryIndex);
    } else {
        // Transition to Proposal
        gallerySection.style.display = 'none';
        proposalSection.classList.remove('hidden-section');
        // Trigger generic confetti burst for fun
        jsConfetti({ emojis: ['❤️', '🌹', '✨'], confettiNumber: 30 });
    }
});

// Configuration: REPLACE THIS WITH YOUR PHONE NUMBER!
const CONFIG = {
    // Format: Country code + Number (no spaces or dashes)
    // Example: "15551234567" for US number 555-123-4567
    phoneNumber: "254758937402",
    responseMessage: "Yes, I'd love to! <3"
};

// Yes Button Click Event
yesBtn.addEventListener('click', () => {
    proposalSection.style.display = 'none';
    successMessage.classList.add('show');

    // 1. Trigger Confetti
    playConfetti();
    setInterval(playConfetti, 3000);

    // 2. Redirect to WhatsApp after 3 seconds
    setTimeout(() => {
        const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(CONFIG.responseMessage)}`;
        window.location.href = whatsappUrl;
    }, 3000);
});

// No Button Interaction
noBtn.addEventListener('mouseenter', changeNoButtonText);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    changeNoButtonText();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    changeNoButtonText();
});

function changeNoButtonText() {
    noBtn.style.position = 'relative';
    const phrases = [
        "Are you sure? 😗",
        "Think again! 🧐",
        "Think harder boo! 😙",
        "Look at the other button! 👈🏾",
        "🫠",
        "👀🔪"
    ];
    noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
}

function playConfetti() {
    jsConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#fff0f3', '#ffd700', '#ffffff']
    });
}
