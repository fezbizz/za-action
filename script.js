// SA Action — interactive features
(function() {
    'use strict';

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-bar a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-bar a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.borderBottomColor = 'transparent';
            link.style.background = 'transparent';
            if (link.getAttribute('href') === '#' + current) {
                link.style.borderBottomColor = '#FFB612';
                link.style.background = 'rgba(255, 182, 18, 0.1)';
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // "Report" phone number tap-to-call for mobile
    const phones = document.querySelectorAll('.phone');
    phones.forEach(el => {
        const num = el.textContent.trim().replace(/[^0-9]/g, '');
        if (num) {
            el.style.cursor = 'pointer';
            el.title = 'Tap to call';
            el.addEventListener('click', () => {
                if (window.confirm(`Call ${el.textContent.trim()}?`)) {
                    window.location.href = `tel:${num}`;
                }
            });
        }
    });

    // Simple counter: display number of young people taking action
    const counterSection = document.createElement('section');
    counterSection.className = 'section alt-bg';
    counterSection.style.textAlign = 'center';
    counterSection.innerHTML = `
        <h2>🔥 Join the Movement</h2>
        <div style="font-size: 3em; font-weight: 800; color: var(--green); margin: 20px 0;" id="actionCounter">0</div>
        <p style="font-size: 1.2em;">young South Africans taking action</p>
        <button id="countBtn" style="
            background: var(--gold);
            color: var(--black);
            border: none;
            padding: 14px 32px;
            font-size: 1.1em;
            font-weight: 700;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 20px;
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            💪 I'm Taking Action
        </button>
    `;

    // Insert before footer
    const footer = document.querySelector('footer');
    footer.parentNode.insertBefore(counterSection, footer);

    // Counter logic
    let count = parseInt(localStorage.getItem('saActionCount') || '0');
    document.getElementById('actionCounter').textContent = count.toLocaleString();

    document.getElementById('countBtn').addEventListener('click', function() {
        count++;
        localStorage.setItem('saActionCount', count.toString());
        document.getElementById('actionCounter').textContent = count.toLocaleString();

        // Confetti-like visual feedback
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: radial-gradient(circle, rgba(255,182,18,0.3), transparent);
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.5s;
        `;
        document.body.appendChild(flash);
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 500);
        }, 100);
    });

})();
