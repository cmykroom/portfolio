// 平滑滚动到指定项目
function to(id) {
    const el = document.getElementById(id);
    const container = document.getElementById('gal'); 
    if (el && container) {
        // 计算目标元素在滚动容器内的位置
        const topPos = el.offsetTop;
        container.scrollTo({
            top: topPos,
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

// 实时时钟 (24小时制)
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
