// ==========
// CONTACT FORM FEEDBACK
// ==========
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const feedback = document.getElementById('feedback');
    const form = this;

    btn.classList.add('sending');

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        setTimeout(() => btn.classList.remove('sending'), 200);

        if (response.ok) {
            feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent! I\'ll get back to you soon.';
            feedback.className = 'form-feedback success show';
            form.reset();
        } else {
            feedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.';
            feedback.className = 'form-feedback error show';
        }
    } catch (error) {
        btn.classList.remove('sending');
        feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network error. Please try again.';
        feedback.className = 'form-feedback error show';
    }

    setTimeout(() => {
        feedback.classList.remove('show');
        
        setTimeout(() => {
            feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent! I\'ll get back to you soon.';
            feedback.className = 'form-feedback';
        }, 400);
    }, 4000);
});

// ==========
// LEFT MINI TERMINAL
// ==========
(function() {
    const terminalBody = document.getElementById('terminalBody');
    const terminalInput = document.getElementById('terminalInput');
    if (!terminalBody || !terminalInput) return;

    const commands = {
        help: () => [
            'Available commands:',
            '  <span class="cmd">whoami</span>      - who am I?',
            '  <span class="cmd">projects</span>    - my projects',
            '  <span class="cmd">contact</span>     - get in touch',
            '  <span class="cmd">clear</span>       - clear terminal',
            '  <span class="cmd">???</span>      - ???'
        ],
        whoami: () => [
            'Vanshika - 2nd yr SE student & fullstack builder.',
            'Currently rebuilding SuriHealth.'
        ],
        projects: () => [
            '1. WeatherWise | live weather dashboard (HTML/CSS/JS)',
            '2. SuriHealth V1 | meal planner (Node/Express/Prisma)',
            '3. SuriHealth V2 | modern rebuild (type-safe backend, in progress)'
        ],
        contact: () => [
            'Email: viraitrish2006@gmail.com',
            'GitHub: github.com/viraitrisha',
            'Or just use the form on the right →'
        ],
        clear: () => { terminalBody.innerHTML = ''; return []; },
        secret: () => [
            'You found the hidden command!',
            '> exit'
        ],
        '???': () => [
            "That's incorrect. Hint: it's a <span class=\"cmd\">Secret</span>."
        ]
    };

    function appendLine(text, type = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        if (trimmed === '') return;

        appendLine(`<span class="cmd">$ ${cmd}</span>`, 'input');

        if (commands[trimmed]) {
            const lines = commands[trimmed]();
            lines.forEach(text => appendLine(text));
        } else {
            appendLine(`command not found: ${trimmed}. Type <span class="cmd">help</span> for options.`);
        }
    }

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            processCommand(this.value);
            this.value = '';
        }
    });

    document.getElementById('miniTerminal').addEventListener('click', () => {
        terminalInput.focus();
    });
})();