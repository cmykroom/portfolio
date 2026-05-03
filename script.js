// 全局变量存储从 JSON 读取的数据
let allProjects = [];

// 1. 初始化：加载数据并启动时钟
window.onload = () => {
    loadProjects();
    updateClock();
    setInterval(updateClock, 1000);
};

// 2. 从 JSON 文件异步获取数据
async function loadProjects() {
    try {
        // 确保 projects.json 文件在同一目录下
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('无法读取 projects.json');
        
        allProjects = await response.json();
        
        renderList();    // 渲染左侧文字列表
        renderGallery(); // 渲染右侧图片列表
    } catch (error) {
        console.error("项目加载失败:", error);
    }
}

// 3. 渲染左侧文字列表
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

// 4. 渲染右侧首页图片列表
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

// 5. 显示作品详情页
function showDetail(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return;

    // 填充基本文本信息
    document.getElementById('d-client').innerText = project.client;
    document.getElementById('d-project').innerText = project.project;
    document.getElementById('d-year').innerText = project.year;
    document.getElementById('d-img').src = project.cover;
    document.getElementById('d-text').innerHTML = project.description;
    
    // 渲染标签 (Tags)
    const tagsContainer = document.getElementById('d-tags');
    if (project.tags) {
        tagsContainer.innerHTML = project.tags.map(t => `<li>${t}</li>`).join('');
    }

    // 渲染详情页的子网格图片 (Grid)
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

    // 视图切换
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    document.getElementById('index-btn').style.display = 'block';
    
    // 滚动回顶部
    document.getElementById('gal').scrollTop = 0;
}

// 6. 视图切换函数
function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    document.getElementById('index-btn').style.display = 'none';
}

function showInfo() {
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'block';
    document.getElementById('index-btn').style.display = 'block';
    document.getElementById('gal').scrollTop = 0;
}

// 7. 辅助功能：滚动与时钟
function scrollToId(id) {
    showGallery(); // 确保在首页视图
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

function updateClock() {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.innerText = timeString;
}
