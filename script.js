// 在你原有的 script.js 基础上添加或替换以下函数

function toggleMobileList() {
    const leftPanel = document.querySelector('.left-panel');
    const listBtn = document.getElementById('mobile-list-btn');
    leftPanel.classList.toggle('active');
    listBtn.innerText = leftPanel.classList.contains('active') ? 'Close' : 'List';
}

// 手机菜单内：点击名字回到首页
function mobileGoHome() {
    const leftPanel = document.querySelector('.left-panel');
    if (leftPanel.classList.contains('active')) toggleMobileList();
    showGallery();
    scrollToTop();
}

// 手机菜单内：点击 Information 跳转
function mobileGoInfo() {
    const leftPanel = document.querySelector('.left-panel');
    if (leftPanel.classList.contains('active')) toggleMobileList();
    showInfo();
}

// 修改原有的 scrollToId，确保点击列表后关闭右侧菜单
function scrollToId(id) {
    const leftPanel = document.querySelector('.left-panel');
    if (window.innerWidth <= 800 && leftPanel.classList.contains('active')) {
        toggleMobileList();
    }
    showGallery();
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// 其他原有函数（如 renderList, renderGallery, updateClock 等）保持不变
