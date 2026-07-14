// SA Action — interactive features
(function() {
    'use strict';

    // ===== UPCOMING MARCHES & EVENTS =====
    // Edit this array to add/update events. Format:
    // { date: "15 Jul", title: "March against...", desc: "...", location: "Pretoria, Union Buildings", org: "March and March" }
    // Events are stored and displayed automatically.
    const events = [
        // --- ADD NEW EVENTS BELOW THIS LINE ---
        // Example:
        // { date: "17 Jul", day: "Thu", title: "National Shutdown March", desc: "Nationwide protests against illegal immigration and border collapse.", location: "Multiple locations — check movement pages", org: "March and March" },
        // { date: "18 Jul", day: "Fri", title: "Pretoria Mass Meeting", desc: "Community meeting to plan next steps.", location: "Pretoria, Church Square", org: "LACO" },
        // --- ADD NEW EVENTS ABOVE THIS LINE ---
    ];

    function renderEvents() {
        const container = document.getElementById('eventsContainer');
        if (!container) return;

        if (events.length === 0) {
            container.innerHTML = `
                <div class="event-card placeholder">
                    <div class="event-date">—</div>
                    <div class="event-details">
                        <h3>No upcoming marches posted yet</h3>
                        <p>We're tracking ground-level movements. Check back soon or follow the movements below on Facebook, YouTube, and TikTok for real-time updates.</p>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = events.map(ev => `
            <div class="event-card">
                <div class="event-date">
                    <span class="day">${ev.date}</span>
                    ${ev.day || ''}
                </div>
                <div class="event-details">
                    <h3>${ev.title}</h3>
                    <p>${ev.desc}</p>
                    ${ev.location ? `<div class="event-location">📍 ${ev.location}</div>` : ''}
                    ${ev.org ? `<div style="margin-top:6px;font-size:0.8em;color:var(--gold);font-weight:700;">Organised by: ${ev.org}</div>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderEvents();

    // ===== UPDATE TICKER TEXT =====
    function updateTicker() {
        const ticker = document.getElementById('tickerText');
        if (!ticker || events.length === 0) return;

        const nextEvents = events.slice(0, 3);
        const msg = nextEvents.map(e => `📢 ${e.date} — ${e.title} (${e.location || 'TBC'})`).join('  ◆  ');
        ticker.innerHTML = `<span>🇿🇦 SA Action LIVE — ${msg}  ◆  Follow movements on Facebook, YouTube, TikTok for ground-level updates</span>`;
    }
    updateTicker();

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('.nav-bar a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== ACTIVE NAV HIGHLIGHT =====
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

    // ===== TAP-TO-CALL =====
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

    // ===== ACTION COUNTER =====
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

    const footer = document.querySelector('footer');
    footer.parentNode.insertBefore(counterSection, footer);

    let count = parseInt(localStorage.getItem('saActionCount') || '0');
    document.getElementById('actionCounter').textContent = count.toLocaleString();

    document.getElementById('countBtn').addEventListener('click', function() {
        count++;
        localStorage.setItem('saActionCount', count.toString());
        document.getElementById('actionCounter').textContent = count.toLocaleString();

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
