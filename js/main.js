// ==========
// NAVIGATION CLICK HANDLER
// ==========
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

document.getElementById('contact-btn').addEventListener('click', () => {
    window.location.href = './contact.html';
});

const aboutBtn = document.getElementById('about-btn');
if (aboutBtn) {
    aboutBtn.addEventListener('click', () => {
        window.location.href = './about.html';
    });
}

document.querySelector('.logo').addEventListener('click', () => {
    window.location.href = './index.html';
});

document.getElementById('home-contact-btn')?.addEventListener('click', () => {
    window.location.href = './contact.html';
});
// ==========
// HERO CANVAS ANIMATION
// ==========
(() => {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rootStyles = getComputedStyle(document.documentElement);
    const BG = rootStyles.getPropertyValue("--background").trim() || "#0E1E42";
    const ACCENT = rootStyles.getPropertyValue("--accent").trim() || "#41D3BE";
    const CTA = rootStyles.getPropertyValue("--cta-btn").trim() || "#AF143C";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mode = "matrix";
    let animationId = null;
    let fontSize, columns;
    let streams = [];
    let particles = [];

    const matrixChars = "0123456789{}[]()<>/$=#;abcdefghijklmnopqrstuvwxyz".split("");
    const binaryChars = "01".split("");

    const randomChar = (charset) => charset[Math.floor(Math.random() * charset.length)];

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        fontSize = Math.max(16, Math.min(22, Math.floor(rect.width / 35)));
        columns = Math.floor(canvas.width / fontSize);
    }

    function initRain() {
        streams = Array.from({ length: columns }, () => ({
        y: Math.random() * -canvas.height * 1.5,
        speed: 1 + Math.random() * 2,
        length: 8 + Math.floor(Math.random() * 8),
        chars: Array.from({ length: 16 }, () => randomChar(mode === "binary" ? binaryChars : matrixChars)),
        }));
    }

    function initParticles() {
        const count = Math.floor((canvas.width * canvas.height) / 3000);
        particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        }));
    }

    function drawRain(charset) {
        ctx.fillStyle = BG + "1A";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
        ctx.textAlign = "center";

        streams.forEach((stream, i) => {
        const x = i * fontSize + fontSize / 2;
        for (let j = 0; j < stream.length; j++) {
            const y = stream.y - j * fontSize;
            if (y < -fontSize || y > canvas.height) continue;

            if (Math.random() < 0.02) stream.chars[j] = randomChar(charset);

            if (j === 0) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = ACCENT;
            ctx.fillStyle = "#FFFFFF";
            } else {
            ctx.shadowBlur = 0;
            const alpha = 1 - j / stream.length;
            ctx.fillStyle = ACCENT + Math.round(alpha * 255).toString(16).padStart(2, '0');
            }
            ctx.fillText(stream.chars[j], x, y);
        }
        ctx.shadowBlur = 0;
        stream.y += stream.speed;
        if (stream.y - stream.length * fontSize > canvas.height) {
            stream.y = -Math.random() * 50;
            stream.speed = 1 + Math.random() * 2;
            stream.length = 8 + Math.floor(Math.random() * 8);
        }
        });
    }

    function drawBinaryRain() {
        drawRain(binaryChars);
    }

    function drawMatrixRain() {
        drawRain(matrixChars);
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > canvas.height + p.size) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = ACCENT;
        ctx.fill();
        ctx.shadowBlur = 0;
        });
    }

    function drawFrame() {
        switch (mode) {
        case "matrix": drawMatrixRain(); break;
        case "binary": drawBinaryRain(); break;
        case "particles": drawParticles(); break;
        default: drawMatrixRain();
        }
        animationId = requestAnimationFrame(drawFrame);
    }

    function drawStatic() {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (mode === "particles") {
        initParticles();
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = ACCENT + "40";
            ctx.fill();
        });
        } else {
        const charset = mode === "binary" ? binaryChars : matrixChars;
        ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
        ctx.textAlign = "center";
        for (let i = 0; i < columns; i++) {
            ctx.fillStyle = ACCENT + "40";
            ctx.fillText(randomChar(charset), i * fontSize + fontSize / 2, Math.random() * canvas.height);
        }
        }
    }

    function stopAnimation() {
        if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        }
    }

    function startAnimation() {
        stopAnimation();
        resizeCanvas();
        if (mode === "particles") {
        initParticles();
        } else {
        initRain();
        }

        if (prefersReduced) {
        drawStatic();
        } else {
        drawFrame();
        }
    }

    const toggleBtn = document.getElementById("heroToggle");
    if (toggleBtn) {
        const modes = ["matrix", "binary", "particles"];
        toggleBtn.addEventListener("click", () => {
        const currentIndex = modes.indexOf(mode);
        mode = modes[(currentIndex + 1) % modes.length];
        
        const modeLabels = { matrix: "Matrix Rain", binary: "Binary Rain", particles: "Particles" };
        toggleBtn.setAttribute("aria-label", `Animation: ${modeLabels[mode]}`);
        startAnimation();
        });
    }

    document.addEventListener("visibilitychange", () => {
        document.hidden ? stopAnimation() : startAnimation();
    });
    window.addEventListener("resize", startAnimation);
    const hero = document.querySelector(".hero-section");
    if (hero && "ResizeObserver" in window) {
        new ResizeObserver(startAnimation).observe(hero);
    }

    startAnimation();
})();

// ==========
// HERO TYPING ANIMATION
// ==========
(function() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const fullText = "Aspiring Fullstack Developer";
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 70;
    const deletingSpeed = 40;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    function type() {
        if (!isDeleting) {
            if (index < fullText.length) {
                textElement.textContent = fullText.slice(0, index + 1);
                index++;
                setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(type, pauseAfterTyping);
            }
        } else {
            if (index > 0) {
                index--;
                textElement.textContent = fullText.slice(0, index);
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                setTimeout(type, pauseAfterDeleting);
            }
        }
    }

    type();
})();

// ==========
// ABOUT SECTION INTERACTIONS
// ==========
document.addEventListener('DOMContentLoaded', () => {
    const ring = document.getElementById('avatarRing');
    const avatarContainer = document.getElementById('avatarContainer');
    if (!ring || !avatarContainer) return;

    avatarContainer.addEventListener('dblclick', () => {
        ring.style.animation = 'none';
        ring.offsetHeight;
        ring.style.animation = 'ringRotate 1s linear infinite';
        ring.style.opacity = '1';
        ring.style.borderColor = 'var(--cta-btn)';

        setTimeout(() => {
            ring.style.animation = 'ringRotate 20s linear infinite';
            ring.style.opacity = '0.7';
            ring.style.borderColor = 'var(--accent)';
        }, 2000);
    });

    const comment = document.getElementById('codeComment');
    const phrases = [
        "/* 404 sleep not found */",
        "/* it works on my machine */",
        "/* ...currently busy coding */",
    ];
    let phraseIndex = 0;

    avatarContainer.addEventListener('click', (e) => {
        if (e.detail === 2) return;

        phraseIndex = (phraseIndex + 1) % phrases.length;
        comment.textContent = phrases[phraseIndex];

        comment.style.transform = 'scale(1.1)';
        setTimeout(() => {
            comment.style.transform = '';
        }, 150);
    });
});

// ==========
// ABOUT SECTION AGE COUNT
// ==========
const ageStat = document.querySelector('.stat-item .stat-number');

const ageItem = [...document.querySelectorAll('.stat-item')]
  .find(item => item.querySelector('.stat-label')?.textContent === 'Years Old');

if (ageItem) {
    const numberEl = ageItem.querySelector('.stat-number');
    const target = 19;
    const duration = 1500; // ms
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animated = true;
            animateCounter(numberEl, 0, target, duration);
            observer.unobserve(entry.target);
        }
        });
    }, { threshold: 0.5 });

    observer.observe(ageItem);

    function animateCounter(el, start, end, duration) {
        const startTime = performance.now();
        const step = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        el.textContent = current;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
        };
        requestAnimationFrame(step);
    }
}

// ==========
// WORKS SECTION TERMINAL
// ==========
(function() {
    const worksSection = document.querySelector('.works-section');
    if (!worksSection) return;

    const secretSequence = ['React', 'Better Auth', 'PostgreSQL'];
    let currentStep = 0;

    worksSection.addEventListener('click', (e) => {
        const tag = e.target.closest('.tool-tag');
        if (!tag) return;

        const tagText = tag.textContent.trim();
        if (tagText === secretSequence[currentStep]) {
            currentStep++;

            tag.style.transform = 'scale(1.2)';
            tag.style.boxShadow = '0 0 15px var(--cta-btn)';
            setTimeout(() => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            }, 300);

            if (currentStep === secretSequence.length) {
                triggerTerminal();
                currentStep = 0;
            }
        } else {
            currentStep = 0;
        }
    });

    function triggerTerminal() {
        
        worksSection.classList.add('terminal');

        const msg = document.createElement('div');
        msg.className = 'terminal-msg';
        msg.textContent = '';
        worksSection.appendChild(msg);

        const fullMsg = 
            "Vanshika@DESKTOP-CODE MINGW64 ~/portfolio\n" +
            "$ git log --oneline --graph --all\n" +
            "* a1b2c3d (HEAD -> main) SuriHealth V2: type-safe rebuild\n" +
            "* e4f5g6h WeatherWise: live weather dashboard\n" +
            "* i7j8k9l Initial commit: portfolio launch\n\n" +
            "Vanshika@DESKTOP-CODE MINGW64 ~/portfolio\n" +
            "$ git checkout secret-branch\n" +
            "Switched to branch 'secret-branch'\n\n" +
            "Vanshika@DESKTOP-CODE MINGW64 ~/portfolio (secret-branch)\n" +
            "$ cat secret.txt\n" +
            "You found the secret!";
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullMsg.length) {
                msg.textContent += fullMsg.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);

                setTimeout(() => {
                    worksSection.classList.remove('terminal');
                    if (msg.parentNode) msg.parentNode.removeChild(msg);
                }, 5000);
            }
        }, 30);
    }
})();

// ==========
// CONTACT SECTION LIGHT BULP
// ==========
(function() {
    const section = document.querySelector('.contact-section');
    const bulbField = document.getElementById('bulbField');
    if (!section || !bulbField) return;

    const bulbCount = 45;
    const fragment = document.createDocumentFragment();

    
    for (let i = 0; i < bulbCount; i++) {
        const bulb = document.createElement('i');
        bulb.className = 'fa-regular fa-lightbulb bulb';
        bulb.setAttribute('aria-hidden', 'true');

        let x, y;
        do {
            x = Math.random() * 100;
            y = Math.random() * 100;
        } while (x > 30 && x < 70 && y > 30 && y < 70);

        bulb.style.left = x + '%';
        bulb.style.top = y + '%';
        bulb.style.animationDelay = Math.random() * 2 + 's';
        bulb.addEventListener('click', toggleLightMode);
        fragment.appendChild(bulb);
    }
    bulbField.appendChild(fragment);

    function toggleLightMode() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
})();