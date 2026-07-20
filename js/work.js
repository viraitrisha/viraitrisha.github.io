// ==========
// NORMAL FILTER
// ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

function applyFilter(category) {
    projectItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
    });
});

// ==========
// EXPAND DETAILS
// ==========
const detailBtns = document.querySelectorAll('.detail-btn');
detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectItem = btn.closest('.project-item');
        const extra = projectItem.querySelector('.project-extra');
        if (extra) {
            extra.classList.toggle('open');
            btn.textContent = extra.classList.contains('open') ? 'Less Details' : 'More Details';
        }
    });
});

// ==========
// FILTER USING TECHBLOCKS
// ==========
const techBlocks = document.querySelectorAll('.tech-block');
techBlocks.forEach(block => {
    block.addEventListener('click', () => {
        const techName = block.textContent.trim();
        filterBtns.forEach(b => b.classList.remove('active'));

        const allMatchingBlocks = document.querySelectorAll(`.tech-block`);
        allMatchingBlocks.forEach(b => b.classList.remove('pulse-highlight'));

        let found = false;
        projectItems.forEach(item => {
            const blocks = item.querySelectorAll('.tech-block');
            const hasTech = Array.from(blocks).some(b => b.textContent.trim() === techName);
            if (hasTech) {
                item.classList.remove('hidden');
                found = true;
            } else {
                item.classList.add('hidden');
            }
        });

        if (found) {
            projectItems.forEach(item => {
                if (!item.classList.contains('hidden')) {
                    const blocks = item.querySelectorAll('.tech-block');
                    blocks.forEach(b => {
                        if (b.textContent.trim() === techName) {
                            b.classList.add('pulse-highlight');
                            setTimeout(() => b.classList.remove('pulse-highlight'), 1200);
                        }
                    });
                }
            });
        }
    });
});

// ==========
// TYPING ANIMATION
// ==========
const projectDescs = document.querySelectorAll('.project-desc');

const originalTexts = new Map();
projectDescs.forEach(desc => {
    originalTexts.set(desc, desc.textContent.trim());
    desc.textContent = '';
    desc.style.visibility = 'visible';
});

function typeWriter(element, text, speed = 15, callback) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const desc = entry.target.querySelector('.project-desc');
            if (desc && originalTexts.has(desc) && desc.textContent === '') {
                typeWriter(desc, originalTexts.get(desc), 12);
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

projectItems.forEach(item => observer.observe(item));

function resetAllDescriptions() {
    projectDescs.forEach(desc => {
        if (originalTexts.has(desc)) {
            desc.textContent = '';
        }
    });
    observer.disconnect();
    projectItems.forEach(item => observer.observe(item));
}

const originalApplyFilter = applyFilter;
applyFilter = function(category) {
    originalApplyFilter(category);
    resetAllDescriptions();
};

const originalTechBlockClick = techBlocks[0]?.parentElement;
(function() {
    techBlocks.forEach(block => {
        block.addEventListener('click', function(e) {
            setTimeout(resetAllDescriptions, 10);
        });
    });
})();