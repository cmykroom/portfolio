/**
 * 核心逻辑：跳转、时钟、回到顶部
 */

// 1. 点击左侧列表，右侧平滑滚动到指定 ID
function to(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 2. 右侧回到顶部函数
function scrollToTop() {
    const container = document.getElementById('gal');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// 3. 实时更新 24 小时制时钟
function updateClock() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
        timerElement.innerText = timeString;
    }
}

// 初始化时钟并每秒更新
setInterval(updateClock, 1000);
updateClock();
