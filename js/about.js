// ==========
// FUB FACTS ABOUT ME
// ==========
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

// ==========
// SKILLS PERCENTAGE
// ==========
const skills = [
    { name: 'HTML / CSS', level: 85 },
    { name: 'JavaScript', level: 65 },
    { name: 'React', level: 40 },
    { name: 'Node.js', level: 65 },
    { name: 'PostgreSQL', level: 45 },
    { name: 'Drizzle ORM', level: 40 },
    { name: 'Tailwind', level: 40 },
    { name: 'Python', level: 50 },
    { name: 'Java', level: 35 },
    { name: 'MySQL', level: 50 },
    { name: 'Zod', level: 45 },
];

const skillsGrid = document.getElementById('skillsGrid');
if (skillsGrid) {
    skills.forEach(skill => {
        const skillHTML = `
            <div class="skill-item">
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-level">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${skill.level}%" style="width: 0%;"></div>
                </div>
            </div>
        `;
        skillsGrid.insertAdjacentHTML('beforeend', skillHTML);
    });

    const progressBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// ==========
// GAME CARD GLITCH
// ==========
const gameCard = document.getElementById('gameCard');
const monocle = document.getElementById('monocle');
if (gameCard && monocle) {
    gameCard.addEventListener('dblclick', () => {
        
        monocle.classList.add('show');
        document.body.classList.add('glitch-active');

        setTimeout(() => {
            monocle.classList.remove('show');
            document.body.classList.remove('glitch-active');
        }, 5000);
    });
}