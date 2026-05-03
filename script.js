let allProjects = [];

async function init() {
    try {
        const response = await fetch('projects.json');
        allProjects = await response.json();
        renderList();
        renderGallery();
        updateClock();
        setInterval(updateClock, 1000);
    } catch (e) { console.error("加载失败", e); }
}

function renderList() {
    const listWrap = document.getElementById('js-project-list');
    listWrap.innerHTML = allProjects.map(p => `
        <div class="project-item" onclick="scrollToId('${p.id}')">
            <div class="col-1">${p.client}</div>
            <div class="col-2">${p.project}</div>
            <div class="col-3">${p.year}</div>
        </div>`).join('');
}

function renderGallery() {
    const galWrap = document.getElementById('js-gallery-content');
    galWrap.innerHTML = allProjects.map(p => `
        <div class="gallery-item" id="${p.id}" onclick="showDetail('${p.id}')">
            <div class="image-container">
                <img src="${p.cover}">
                <span class="plus top-left">+</span><span class="plus top-right">+</span>
            </div>
        </div>`).join('');
}

function toggleMobileList() {
    const lp = document.querySelector('.left-panel');
    const btn = document.getElementById('mobile-list-btn');
    lp.classList.toggle('active');
    btn.innerText = lp.classList.contains('active') ? 'Close' : 'List';
}

function mobileGoHome() {
    if (document.querySelector('.left-panel').classList.contains('active')) toggleMobileList();
    showGallery();
    scrollToTop();
}

function mobileGoInfo() {
    if (document.querySelector('.left-panel').classList.contains('active')) toggleMobileList();
    showInfo();
}

function scrollToId(id) {
    if (window.innerWidth <= 800) toggleMobileList();
    showGallery();
    setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

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
    document.getElementById('index-btn').style.display = 'inline-block';
}

function showDetail(id) {
    const p = allProjects.find(i => i.id === id);
    if(!p) return;
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    document.getElementById('index-btn').style.display = 'inline-block';
    
    document.getElementById('d-client').innerText = p.client;
    document.getElementById('d-project').innerText = p.project;
    document.getElementById('d-year').innerText = p.year;
    document.getElementById('d-img').src = p.cover;
    document.getElementById('d-text').innerHTML = p.description || "";
}

function updateClock() {
    const now = new Date();
    document.getElementById('timer').innerText = now.toTimeString().split(' ')[0];
}

function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

window.onload = init;
