// DOM Elements
const gallerySection = document.getElementById('gallery-section');
const proposalSection = document.getElementById('proposal-section');
const nextBtn = document.getElementById('nextBtn');
const memoryImg = document.getElementById('memory-img');
const memoryVideo = document.getElementById('memory-video');
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
        img: "img/us1.jpeg",
        text: "Ever since we met... 💕"
    },
    {
        img: "img/us2.jpeg",
        text: "... you have always shown me the beauty of love 💖🌸."
    },
    {
        video: "img/us.mp4",
        text: "✨✨✨"
    }
];

let currentMemoryIndex = 0;

// Initialize first memory
function showMemory(index) {
    // Add fade-out effect
    memoryImg.style.opacity = '0';
    memoryVideo.style.opacity = '0';
    memoryText.style.opacity = '0';

    setTimeout(() => {
        const memory = memories[index];

        if (memory.video) {
            memoryImg.style.display = 'none';
            memoryVideo.style.display = 'block';
            memoryVideo.src = memory.video;
            memoryVideo.play().catch(e => console.log("Autoplay prevented:", e));
        } else {
            memoryVideo.pause();
            memoryVideo.style.display = 'none';
            memoryImg.style.display = 'block';
            memoryImg.src = memory.img;
        }

        memoryText.textContent = memory.text;

        // Fade in
        // Small delay to allow display change to render before opacity transition
        requestAnimationFrame(() => {
            memoryImg.style.opacity = '1';
            memoryVideo.style.opacity = '1';
            memoryText.style.opacity = '1';
        });
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
