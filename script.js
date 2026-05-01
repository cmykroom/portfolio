function to(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToTop() {
    const container = document.getElementById('gal');
    if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateClock() {
    const timer = document.getElementById('timer');
    if (timer) {
        const now = new Date();
        timer.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
    }
}
setInterval(updateClock, 1000);
updateClock();
