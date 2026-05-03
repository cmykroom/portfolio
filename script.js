let allProjects = [];

window.onload = () => {
    loadProjects();
    updateClock();
    setInterval(updateClock, 1000);

    const gal = document.getElementById("gal");
    if (gal) {
        gal.classList.add("show");
    }
};

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

function renderMobileList() {
    const mobileList = document.getElementById('mobile-project-list');
    if (!mobileList) return;

    mobileList.innerHTML = allProjects.map(p => `
        <div class="project-item" onclick="showDetailFromMobile('${p.id}')">
            <div class="col-1">${p.client}</div>
            <div class="col-2">${p.project}</div>
            <div class="col-3">${p.year}</div>
        </div>
    `).join('');
}

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

function fadeSwitch(callback) {
    const gal = document.getElementById("gal");
    gal.classList.remove("show");

    setTimeout(() => {
        callback();
        gal.scrollTop = 0;
        gal.classList.add("show");
    }, 180);
}

function showDetail(id) {
    const project = allProjects.find(p => p.id === id);
    if (!project) return;

    fadeSwitch(() => {
        document.getElementById('d-client').innerText = project.client;
        document.getElementById('d-project').innerText = project.project;
        document.getElementById('d-year').innerText = project.year;
        document.getElementById('d-img').src = project.cover;
        document.getElementById('d-text').innerHTML = project.description;

        const tagsContainer = document.getElementById('d-tags');
        tagsContainer.innerHTML = project.tags ? project.tags.map(t => `<li>${t}</li>`).join('') : '';

        const gridContainer = document.getElementById('js-detail-grid');
        gridContainer.innerHTML = project.subImages ? project.subImages.map((imgUrl, index) => `
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
        `).join('') : '';

        document.getElementById('gallery-view').style.display = 'none';
        document.getElementById('mobile-list-view').style.display = 'none';
        document.getElementById('detail-view').style.display = 'block';
        document.getElementById('info-view').style.display = 'none';
    });
}

function showDetailFromMobile(id) {
    showDetail(id);
}

function showGallery() {
    fadeSwitch(() => {
        document.getElementById('gallery-view').style.display = 'block';
        document.getElementById('mobile-list-view').style.display = 'none';
        document.getElementById('detail-view').style.display = 'none';
        document.getElementById('info-view').style.display = 'none';
    });
}

function showInfo() {
    fadeSwitch(() => {
        document.getElementById('gallery-view').style.display = 'none';
        document.getElementById('mobile-list-view').style.display = 'none';
        document.getElementById('detail-view').style.display = 'none';
        document.getElementById('info-view').style.display = 'block';
    });
}

function showMobileList() {
    fadeSwitch(() => {
        document.getElementById('gallery-view').style.display = 'none';
        document.getElementById('mobile-list-view').style.display = 'block';
        document.getElementById('detail-view').style.display = 'none';
        document.getElementById('info-view').style.display = 'none';
    });
}

function closeMobileList() {
    showGallery();
}

function scrollToId(id) {
    showGallery();
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 220);
}

function scrollToTop() {
    document.getElementById('gal').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function updateClock() {
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    const timerElement = document.getElementById('timer');
    if (timerElement) timerElement.innerText = timeString;
}
