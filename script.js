// 全局变量存储从 JSON 读取的数据
let allProjects = [];

// 初始化
window.onload = () => {
    loadProjects();
    updateClock();
    setInterval(updateClock, 1000);
};

// 读取 JSON
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('无法读取 projects.json');

        allProjects = await response.json();

        renderList();
        renderMobileList();
        renderGallery();
    } catch (error) {
        console.error("项目加载失败:", error);
    }
}

// 左侧桌面文字列表
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

// 手机LIST文字列表
function renderMobileList() {
    const listContainer = document.getElementById('js-mobile-project-list');
    if (!listContainer) return;

    listContainer.innerHTML = allProjects.map(p => `
        <div class="project-item" onclick="mobileScrollToId('${p.id}')">
            <div class="col-1">${p.client}</div>
            <div class="col-2">${p.project}</div>
            <div class="col-3">${p.year}</div>
        </div>
    `).join('');
}

// 右侧首页图片列表
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
                <span class="plus top-left">+</span><span class="plus top-right">+</span>
                <span class="plus bottom-left">+</span><span class="plus bottom-right">+</span>
            </div>
        </section>
    `).join('');
}

// 显示作品详情
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
                    <span class="plus top-left">+</span><span class="plus top-right">+</span>
                    <span class="plus bottom-left">+</span><span class="plus bottom-right">+</span>
                </div>
                <div class="grid-num">${String(index + 1).padStart(2, '0')}</div>
            </div>
        `).join('');
    }

    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('mobile-list-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';

    document.getElementById('index-btn').style.display = 'block';
    document.getElementById('mobile-list-btn').style.display = 'none';

    document.getElementById('gal').scrollTop = 0;
}

// 首页作品流
function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    document.getElementById('mobile-list-view').style.display = 'none';

    document.getElementById('index-btn').style.display = 'none';
    document.getElementById('mobile-list-btn').style.display = window.innerWidth <= 800 ? 'block' : 'none';

    document.getElementById('gal').scrollTop = 0;
}

// 手机LIST页
function showMobileList() {
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    document.getElementById('mobile-list-view').style.display = 'block';

    document.getElementById('index-btn').style.display = 'none';
}

// info页
function showInfo() {
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('mobile-list-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'block';

    document.getElementById('index-btn').style.display = 'none';
    document.getElementById('mobile-list-btn').style.display = 'none';

    document.getElementById('gal').scrollTop = 0;
}

// 桌面滚动
function scrollToId(id) {
    showGallery();
    const element = document.getElementById(id);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// 手机LIST点击滚动
function mobileScrollToId(id) {
    showGallery();
    const element = document.getElementById(id);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// 返回顶部
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
