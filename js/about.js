// ========== RANDOM FACTS GENERATOR ==========
const funFacts = [
    "I speak Dutch and English fluently.",
    "I prefer dark themes on everything - even my phone.",
    "The first language I learned was Python.",
    "I've read more than 200 novels (and counting).",
    "I've played all sorts of video games, though open-world remains my favorite genre.",
];

const funFactBtn = document.getElementById('funFactBtn');
const funFactDisplay = document.getElementById('funFactDisplay');
if (funFactBtn && funFactDisplay) {
    funFactBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * funFacts.length);
        funFactDisplay.textContent = funFacts[randomIndex];
        funFactDisplay.classList.add('show');
    });
}