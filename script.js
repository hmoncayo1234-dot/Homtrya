/**
 * HOMTRYA - Interactive Scripts & Animations
 * PropTech AI & Condominium Management Platform
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initFlipCards();
    initAiConsole();
    initTabs();
    initRoiCalculator();
    initFaqAccordion();
    initScrollAnimations();
    initCounters();
    initLeadForm();
});

/* =====================================================
   1. PARTICLE CANVAS SYSTEM (50 GLOWING NODES)
   ===================================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby nodes
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* =====================================================
   2. NAVBAR STICKY & MOBILE DRAWER
   ===================================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            toggleBtn.innerHTML = mobileMenu.classList.contains('active') 
                ? '✕' 
                : '☰';
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                toggleBtn.innerHTML = '☰';
            });
        });
    }
}

/* =====================================================
   3. FLIP CARDS INTERACTION (TAP ON MOBILE)
   ===================================================== */
function initFlipCards() {
    const flipCards = document.querySelectorAll('.service-card-flip');
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If click wasn't on an anchor tag
            if (!e.target.closest('a')) {
                card.classList.toggle('is-flipped');
            }
        });
    });
}

/* =====================================================
   4. INTERACTIVE AI AGENT CONSOLE SIMULATOR
   ===================================================== */
const consoleScenarios = {
    pqr: {
        title: "Reporte de Emergencia & PQR",
        prompt: "Resident #402: 'Se presenta filtración de agua en ducto principal Torre 2'",
        agentResponse: "Agente Homtrya AI activado. Categorizado como Emergencia Hidráulica Prioridad 1. 1) Notificación enviada al fontanero de turno y conserjería vía WhatsApp empresarial. 2) Válvula de paso parcial programada para inspección. 3) Copropietario notificado con ticket #HY-8921 y tiempo estimado de llegada: 18 minutos.",
        res1: { label: "Tiempo de Respuesta", val: "1.4 seg" },
        res2: { label: "Acción Ejecutada", val: "Proveedor despachado" },
        res3: { label: "Estado Ticket", val: "En Ruta (Prioridad Alta)" }
    },
    budget: {
        title: "Auditoría Financiera & Presupuesto",
        prompt: "¿Cómo va la ejecución presupuestal del mes frente al rubro de mantenimiento?",
        agentResponse: "Análisis financiero completado. El rubro de mantenimiento general registra una ejecución del 68.2% ($14.2M de $20.8M asignados). Se detectó un ahorro acumulado de $2.1M por optimización de contratos de aseo. El cumplimiento presupuestal proyectado al cierre del trimestre es del 98.6%. Sin desvíos críticos.",
        res1: { label: "Precisión Contable", val: "100% Conciliado" },
        res2: { label: "Ahorro Identificado", val: "$2.1M COP" },
        res3: { label: "Alerta Presupuesto", val: "Óptimo (Verde)" }
    },
    assembly: {
        title: "Asamblea & Actas Legales",
        prompt: "Generar borrador de acta de asamblea extraordinaria del 24 de agosto con votaciones de quórum",
        agentResponse: "Acta generada bajo normativa de Ley de Propiedad Horizontal. Quórum verificado: 78.4% de coeficientes. Votación sobre cambio de luminarias LED aprobada con el 89.2% de votos favorables. Acta estructurada con firmas digitales del Presidente y Secretario de Asamblea lista para revisión del Consejo.",
        res1: { label: "Quórum Validado", val: "78.4% Coef." },
        res2: { label: "Validez Jurídica", val: "Cumple Norma" },
        res3: { label: "Tiempo de Generación", val: "3.8 seg" }
    },
    booking: {
        title: "Reserva de Zonas Comunes & Accesos",
        prompt: "Copropietario Torre 1 Apt 905 solicita reserva del Salón Social y permiso para 15 invitados el sábado",
        agentResponse: "Verificación de estado de cuenta: Al día. Disponibilidad de Salón Social confirmada para sábado 18:00 - 23:00. Depósito de garantía registrado. 15 pases de acceso con código QR temporal generados para la portería y enviados al copropietario.",
        res1: { label: "Cartera Verificada", val: "Paz y Salvo" },
        res2: { label: "Acceso Portería", val: "15 QRs Activos" },
        res3: { label: "Reserva", val: "Confirmada al 100%" }
    }
};

function initAiConsole() {
    const promptButtons = document.querySelectorAll('.prompt-btn');
    const promptDisplay = document.getElementById('console-user-prompt');
    const responseDisplay = document.getElementById('console-agent-response');
    const res1Label = document.getElementById('res1-label');
    const res1Val = document.getElementById('res1-val');
    const res2Label = document.getElementById('res2-label');
    const res2Val = document.getElementById('res2-val');
    const res3Label = document.getElementById('res3-label');
    const res3Val = document.getElementById('res3-val');

    if (!promptButtons.length || !promptDisplay) return;

    promptButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            promptButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const scenarioKey = btn.getAttribute('data-scenario');
            const data = consoleScenarios[scenarioKey];
            if (!data) return;

            // Stream user prompt and AI response
            promptDisplay.textContent = `"${data.prompt}"`;
            responseDisplay.textContent = "Procesando solicitud mediante Agentes de IA Homtrya...";
            responseDisplay.style.opacity = '0.6';

            setTimeout(() => {
                responseDisplay.textContent = data.agentResponse;
                responseDisplay.style.opacity = '1';

                res1Label.textContent = data.res1.label;
                res1Val.textContent = data.res1.val;
                res2Label.textContent = data.res2.label;
                res2Val.textContent = data.res2.val;
                res3Label.textContent = data.res3.label;
                res3Val.textContent = data.res3.val;
            }, 300);
        });
    });
}

/* =====================================================
   5. STAKEHOLDER ECOSYSTEM TABS
   ===================================================== */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content-panel');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* =====================================================
   6. ROI & SAVINGS CALCULATOR
   ===================================================== */
function initRoiCalculator() {
    const unitsSlider = document.getElementById('slider-units');
    const budgetSlider = document.getElementById('slider-budget');
    const unitsVal = document.getElementById('val-units');
    const budgetVal = document.getElementById('val-budget');

    const hoursSavedEl = document.getElementById('calc-hours-saved');
    const costSavedEl = document.getElementById('calc-cost-saved');
    const responseTimeEl = document.getElementById('calc-response-time');
    const totalYearlySavings = document.getElementById('calc-total-savings');

    if (!unitsSlider || !budgetSlider) return;

    function updateCalculator() {
        const units = parseInt(unitsSlider.value, 10);
        const budgetM = parseInt(budgetSlider.value, 10); // in millions COP / thousands USD

        unitsVal.textContent = `${units} Unidades`;
        budgetVal.textContent = `$${budgetM}M COP / mes`;

        // Mathematical formulas for savings
        const hoursSaved = Math.round(units * 0.45); // ~45 hours per 100 units
        const costSavingsMonthly = Math.round(budgetM * 0.14 * 10) / 10; // ~14% budget optimization
        const yearlySavings = Math.round(costSavingsMonthly * 12 * 10) / 10;

        hoursSavedEl.textContent = `${hoursSaved} hrs/mes`;
        costSavedEl.textContent = `$${costSavingsMonthly}M COP/mes`;
        responseTimeEl.textContent = "< 3 minutos (vs 48 hrs)";
        totalYearlySavings.textContent = `$${yearlySavings}M COP / año`;
    }

    unitsSlider.addEventListener('input', updateCalculator);
    budgetSlider.addEventListener('input', updateCalculator);
    updateCalculator();
}

/* =====================================================
   7. FAQ ACCORDION
   ===================================================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* =====================================================
   8. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ===================================================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* =====================================================
   9. STATISTIC NUMBER COUNTERS
   ===================================================== */
function initCounters() {
    const counterElements = document.querySelectorAll('.counter-anim');
    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                const prefix = entry.target.getAttribute('data-prefix') || '';
                const suffix = entry.target.getAttribute('data-suffix') || '';
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out expo
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    const currentVal = Math.floor(start + (target - start) * easeProgress);

                    entry.target.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
                    }
                }

                requestAnimationFrame(updateCount);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    counterElements.forEach(el => counterObserver.observe(el));
}

/* =====================================================
   10. LEAD CAPTURE FORM
   ===================================================== */
function initLeadForm() {
    const leadForm = document.getElementById('lead-form');
    const successMessage = document.getElementById('lead-form-success');
    const errorMessage = document.getElementById('lead-form-error');
    if (!leadForm || !successMessage || !errorMessage) return;

    // Use /webhook/lead-homtrya after activating the workflow in n8n.
    const n8nWebhookUrl = 'http://localhost:5678/webhook/lead-homtrya';

    leadForm.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(leadForm);
        const submitButton = leadForm.querySelector('button[type="submit"]');
        const lead = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            source: 'landing-page',
            createdAt: new Date().toISOString()
        };

        successMessage.classList.remove('is-visible');
        errorMessage.classList.remove('is-visible');
        submitButton.disabled = true;

        try {
            const response = await fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lead)
            });

            if (!response.ok) {
                throw new Error(`n8n respondió con ${response.status}`);
            }

            leadForm.reset();
            successMessage.classList.add('is-visible');
        } catch (error) {
            console.error('Error enviando lead a n8n:', error);
            errorMessage.classList.add('is-visible');
        } finally {
            submitButton.disabled = false;
        }
    });
}
