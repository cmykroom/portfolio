// 跳转
function to(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 顶部
function scrollToTop() {
    document.getElementById('gal').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 时钟
function updateClock() {
    const timer = document.getElementById('timer');
    if (!timer) return;
    const now = new Date();
    timer.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();
