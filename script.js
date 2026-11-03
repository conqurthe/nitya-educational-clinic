/* ==========================================================
   NITYA EDUCATIONAL CLINIC & LAB - INTERACTIVE JAVASCRIPT
   Leaves Animation Canvas, Day/Night Engine & Direct Doubt
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REAL FALLING NATURE LEAVES ENGINE (CANVAS) ---
    const canvas = document.getElementById('leavesCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const leafTypes = ['🍃', '🍂', '🌿', '✨'];
    const leaves = [];
    const maxLeaves = 22; // Mobile smooth performance

    for (let i = 0; i < maxLeaves; i++) {
        leaves.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 14 + 16,
            speedX: Math.random() * 1.5 - 0.75,
            speedY: Math.random() * 1.2 + 0.8,
            rotation: Math.random() * 360,
            rotSpeed: Math.random() * 2 - 1,
            symbol: leafTypes[Math.floor(Math.random() * leafTypes.length)],
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    function animateLeaves() {
        ctx.clearRect(0, 0, width, height);

        leaves.forEach(leaf => {
            leaf.y += leaf.speedY;
            leaf.x += Math.sin(leaf.y / 35) + leaf.speedX;
            leaf.rotation += leaf.rotSpeed;

            if (leaf.y > height + 20) {
                leaf.y = -20;
                leaf.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate((leaf.rotation * Math.PI) / 180);
            ctx.globalAlpha = leaf.opacity;
            ctx.font = `${leaf.size}px serif`;
            ctx.fillText(leaf.symbol, 0, 0);
            ctx.restore();
        });

        requestAnimationFrame(animateLeaves);
    }
    animateLeaves();


    // --- 2. DAY & NIGHT MAGIC SWITCH ---
    const themeToggle = document.getElementById('themeToggle');
    const toggleIcon = themeToggle.querySelector('.toggle-icon');
    const toggleText = themeToggle.querySelector('.toggle-text');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('day-mode');
        
        if (document.body.classList.contains('day-mode')) {
            toggleIcon.textContent = '☀️';
            toggleText.textContent = 'Golden Day';
        } else {
            toggleIcon.textContent = '🌙';
            toggleText.textContent = 'Night Forest';
        }
    });


    // --- 3. DIRECT DOUBT SUBMIT TO TEACHER (WHATSAPP) ---
    const doubtForm = document.getElementById('directDoubtForm');
    doubtForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentClass = document.getElementById('userClass').value;
        const studentSubject = document.getElementById('userSubject').value;
        const studentQuestion = document.getElementById('userQuestion').value;

        const teacherNumber = "919412108170"; // Aapka WhatsApp number yahan add ho sakta hai
        const message = `🌿 *Nitya Educational Clinic - New Doubt Query* 🌿\n\n` +
                        `📚 *Class:* ${studentClass}\n` +
                        `📖 *Subject / Topic:* ${studentSubject}\n` +
                        `❓ *Question:* ${studentQuestion}\n\n` +
                        `_Sent via Nitya Educational Platform_`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${teacherNumber}?text=${encodedMessage}`;

        window.open(waUrl, '_blank');
        doubtForm.reset();
    });


    // --- 4. ENGAGEMENT BUTTONS (LIKE & SHARE) ---
    const likeBtn = document.getElementById('likeBtn');
    const likeCount = document.getElementById('likeCount');
    let liked = false;

    likeBtn.addEventListener('click', () => {
        let count = parseInt(likeCount.textContent);
        if (!liked) {
            likeCount.textContent = count + 1;
            likeBtn.style.color = '#10b981';
            liked = true;
        } else {
            likeCount.textContent = count - 1;
            likeBtn.style.color = '';
            liked = false;
        }
    });

    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Nitya Educational Clinic & Lab',
                text: 'ज्ञान वही जो भटकने से रोके और राह दिखाए - NCERT 2026 Academic Hub & Labs',
                url: window.location.href
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('लिंक कॉपी हो गया है! इसे शेयर कर सकते हैं।');
        }
    });

    // --- 5. FEEDBACK POPUP ---
    const feedbackBtn = document.getElementById('feedbackBtn');
    feedbackBtn.addEventListener('click', () => {
        const feedback = prompt("नित्या एजुकेशनल क्लिनिक के लिए अपना बहुमूल्य सुझाव यहाँ लिखें:");
        if (feedback) {
            alert("आपके सुझाव के लिए धन्यवाद! हम निरंतर सुधार के लिए प्रयासरत हैं।");
        }
    });

});

// Drawer Menu Toggle
const menuToggleBtn = document.getElementById('menuToggleBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuDrawer = document.getElementById('menuDrawer');

if(menuToggleBtn && menuDrawer) {
    menuToggleBtn.addEventListener('click', () => menuDrawer.classList.add('open'));
    closeMenuBtn.addEventListener('click', () => menuDrawer.classList.remove('open'));
}
