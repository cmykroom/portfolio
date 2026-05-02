// 平滑滚动至指定项目
function to(id) {
    const el = document.getElementById(id);
    const container = document.getElementById('gal'); 
    if (el && container) {
        // 计算相对于滚动容器的偏移量
        container.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth'
        });
    }
}

// 返回顶部
function scrollToTop() {
    const container = document.getElementById('gal');
    if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 数字时钟
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
