// 平滑滚动
function to(id) {
    const el = document.getElementById(id);
    const container = document.getElementById('gal'); 
    if (el && container) {
        container.scrollTo({
            top: el.offsetTop - 70, // 减去header的高度以获得更好的视觉对齐
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    const container = document.getElementById('gal');
    if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 时钟
function updateClock() {
    const timer = document.getElementById('timer');
    if (timer) {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        timer.innerText = `${h}:${m}:${s}`;
    }
}
setInterval(updateClock, 1000);
updateClock();
