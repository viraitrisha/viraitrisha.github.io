(function() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const chars = '0123456789+_*<>'.split('');
    const fontSize = 16;
    let columns, drops;

    const backgroundColor = '#E8ECF1';
    const accentColor = '#1E4D8C';
    const textColor = '#0B1A33';

    let animationId;

    function setup() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
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
                    ctx.fillStyle = textColor + Math.round(alpha * 255).toString(16).padStart(2, '0');
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
    window.addEventListener('resize', () => {
        if (animationId) cancelAnimationFrame(animationId);
        setup();
        animate();
    });
    setup();
    animate();
})();