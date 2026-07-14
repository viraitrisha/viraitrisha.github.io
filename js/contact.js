document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const feedback = document.getElementById('feedback');

    btn.classList.add('sending');
    
    btn.addEventListener('animationend', function handler() {
        btn.classList.remove('sending');
        btn.removeEventListener('animationend', handler);
    });

    setTimeout(() => {
        feedback.classList.add('show');
        
        setTimeout(() => {
            this.reset();
            feedback.classList.remove('show');
        }, 2500);
    }, 900);
});

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
            'Keep coding, keep dreaming.',
            '> exit'
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