// 1. 跳转到项目
function to(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. 回到顶部
function scrollToTop() {
    document.getElementById('gal').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 3. 时钟
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById('timer').innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();
