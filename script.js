
document.querySelectorAll('.snap').forEach(sec => {
    window.addEventListener('scroll', () => {
        const r = sec.getBoundingClientRect();
        const vh = window.innerHeight;

        if (r.top < vh && r.bottom > 0) {
            const p = Math.min(1, Math.max(0, 1 - Math.abs(r.top) / vh));
            sec.style.opacity = 0.6 + p * 0.4;
            sec.style.transform = `scale(${0.98 + p * 0.02})`;
        }
    });
});


const steps = document.querySelectorAll('.step');
const pinImg = document.getElementById('pinImg');

if (steps.length && pinImg) {
    window.addEventListener('scroll', () => {
        let activeIndex = 0;

        steps.forEach((step, i) => {
            if (step.getBoundingClientRect().top < window.innerHeight * 0.55) {
                activeIndex = i;
            }
        });

        steps.forEach(s => s.classList.remove('active'));
        steps[activeIndex].classList.add('active');

        const newSrc = steps[activeIndex].dataset.img;
        if (!pinImg.src.includes(newSrc)) {
            pinImg.src = newSrc;
        }
    });
}


const grid = document.getElementById('ssGrid');

if (grid) {
    let index = 1;
    const MAX = 30;

    const loadNext = () => {
        if (index > MAX) return;

        const img = new Image();
        img.src = `assets/screenshots/ss${index}.png`;

        img.onload = () => {
            img.className = 'ss-item';
            img.onclick = () => openViewer(img.src);
            grid.appendChild(img);

            index++;
            loadNext(); // load next only if this one exists
        };

        img.onerror = () => {
            // stop silently when no more screenshots exist
            return;
        };
    };

    loadNext();
}


function openViewer(src) {
    const overlay = document.createElement('div');
    overlay.className = 'ss-overlay';

    const img = document.createElement('img');
    img.src = src;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.onclick = () => overlay.remove();
}
