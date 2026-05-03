// 全局项目数据
let allProjects = [];

/* 页面淡入切换函数 */
function fadeSwitch(showId) {
    const views = ['gallery-view', 'detail-view', 'info-view', 'mobile-list-view'];

    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('show');
            el.classList.add('view-fade');
        }
    });

    setTimeout(() => {
        views.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        const target = document.getElementById(showId);
        if (target) {
            target.style.display = 'block';
            setTimeout(() => {
                target.classList.add('show');
            }, 20);
        }
    }, 180);
}

// 初始化
window.onload = () => {
    loadProjects();
    updateClock();
    setInterval(updateClock, 1000);

    setTimeout(() => {
        const gallery = document.getElementById('gallery-view');
        if (gallery) {
            gallery.classList.add('view-fade');
            gallery.classList.add('show');
        }
    }, 50);
};

// 读取JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('无法读取 projects.json');

        allProjects = await response.json();

        renderList();
        renderGallery();
        renderMobileList();
    } catch (error) {
        console.error("项目加载失败:", error);
    }
}

// 左侧桌面列表
function renderList() {
    const listContainer = document.getElementById('js-project-list');
    if (!listContainer) return;

    listContainer.innerHTML = allProjects.map(p => `
        <div class="project-item" onclick="scrollToId('${p.id}')">
            <div class="col-1">${p.client}</div>
            <div class="col-2">${p.project}</div>
            <div class="col-3">${p.year}</div>
        </div>
    `).join('');
}

// 手机list列表
function renderMobileList() {
    const mobileList = document.getElementById('js-mobile-project-list');
    if (!mobileList) return;

    mobileList.innerHTML = allProjects.map(p => `
        <div class="project-item" onclick="showDetail('${p.id}')">
            <div class="col-1">${p.client}</div>
            <div class="col-2">${p.project}</div>
            <div class="col-3">${p.year}</div>
        </div>
    `).join('');
}

// 首页图片流
function renderGallery() {
    const galleryContainer = document.getElementById('js-gallery-content');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = allProjects.map(p => `
        <section class="gallery-item" id="${p.id}" onclick="showDetail('${p.id}')">
            <div class="item-meta">
                <div class="col-1">${p.client}</div>
                <div class="col-2">${p.project}</div>
                <div class="col-3">${p.year}</div>
            </div>
            <div class="image-container">
                <img src="${p.cover}" alt="${p.project}">
                <span class="plus top-left">+</span>
                <span class="plus top-right">+</span>
                <span class="plus bottom-left">+</span>
                <span class="plus bottom-right">+</span>
            </div>
        </section>
    `).join('');
}

// 详情页
function showDetail(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('d-client').innerText = project.client;
    document.getElementById('d-project').innerText = project.project;
    document.getElementById('d-year').innerText = project.year;
    document.getElementById('d-img').src = project.cover;
    document.getElementById('d-text').innerHTML = project.description;

    const tagsContainer = document.getElementById('d-tags');
    if (project.tags) {
        tagsContainer.innerHTML = project.tags.map(t => `<li>${t}</li>`).join('');
    }

    const gridContainer = document.getElementById('js-detail-grid');
    if (project.subImages && gridContainer) {
        gridContainer.innerHTML = project.subImages.map((imgUrl, index) => `
            <div class="grid-item">
                <div class="image-container small">
                    <img src="${imgUrl}">
                    <span class="plus top-left">+</span>
                    <span class="plus top-right">+</span>
                    <span class="plus bottom-left">+</span>
                    <span class="plus bottom-right">+</span>
                </div>
                <div class="grid-num">${String(index + 1).padStart(2, '0')}</div>
            </div>
        `).join('');
    }

    fadeSwitch('detail-view');
    document.getElementById('index-btn').style.display = 'block';
    document.getElementById('gal').scrollTop = 0;
}

// 首页
function showGallery() {
    fadeSwitch('gallery-view');
    document.getElementById('index-btn').style.display = 'none';
    document.getElementById('gal').scrollTop = 0;
}

// info
function showInfo() {
    fadeSwitch('info-view');
    document.getElementById('index-btn').style.display = 'block';
    document.getElementById('gal').scrollTop = 0;
}

// 手机list
function showMobileList() {
    fadeSwitch('mobile-list-view');
    document.getElementById('gal').scrollTop = 0;
}

// 左栏滚动
function scrollToId(id) {
    showGallery();
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 220);
}

// 回顶部
function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

// 时钟
function updateClock() {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.innerText = timeString;
}
