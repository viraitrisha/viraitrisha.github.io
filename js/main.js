// ==========
// HERO CANVAS ANIMATION
// ==========
(function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const chars = '0123456789+_*<>$#@&%abcdefghijklmnopqrstuvwxyz'.split('');
    const fontSize = 24;
    let columns, drops;

    const backgroundColor = '#091540';
    const accentColor = '#0F2557';
    const textColor = '#FFFFFF';

    let animationId;

    function setup() {
        const hero = canvas.parentElement;
        const rect = hero.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        columns = Math.floor(canvas.width / fontSize) + 1;
        drops = Array(columns).fill(1);
    }

    function draw() {
        ctx.fillStyle = backgroundColor + '1A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `600 ${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
        ctx.textAlign = 'center';

        for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = accentColor;
        ctx.fillText(char, x, y);

        for (let j = 1; j <= 3; j++) {
            const trailY = y - j * fontSize;
            if (trailY > 0) {
            const trailChar = chars[Math.floor(Math.random() * chars.length)];
            const alpha = 1 - j * 0.25;
            const hex = Math.round(alpha * 255).toString(16).padStart(2, '0');
            ctx.fillStyle = textColor + hex;
            ctx.fillText(trailChar, x, trailY);
            }
        }

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
        }
    }

    function animate() {
        if (prefersReduced) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
        }
        draw();
        animationId = requestAnimationFrame(animate);
    }

    function handleResize() {
        if (animationId) cancelAnimationFrame(animationId);
        setup();
        animate();
    }

    window.addEventListener('resize', handleResize);

    if (window.ResizeObserver) {
        const hero = document.querySelector('.hero-section');
        if (hero) {
        const ro = new ResizeObserver(() => handleResize());
        ro.observe(hero);
        }
    }

    setup();
    animate();
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