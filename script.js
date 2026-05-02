// 1. 数据配置
const projectData = {
    'p1': {
        client: 'SED_DO', project: 'Ref. R/XTR-082', year: '2049',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover1.jpg',
        tags: ['✓ Layout Design', '✓ Typography', '✓ 240 Pages'],
        text: '这是第一个项目的详细描述...'
    },
    'p2': {
        client: 'SED_DO', project: 'R/PRT-017', year: '2048',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover2.jpg',
        tags: ['✓ Branding', '✓ Logotype'],
        text: '这是第二个项目的详细描述...'
    },
    'p3': { client: 'SED_DO', project: 'Ref. R/CXX-500', year: '2047', img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover3.jpg', tags: ['✓ Web'], text: '内容...' },
    'p4': { client: 'SED_DO', project: 'Ref. R/ANV-310', year: '2046', img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover4.jpg', tags: ['✓ Print'], text: '内容...' },
    'p5': { client: 'SED_DO', project: 'Ref. R/FTH-053', year: '2045', img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover5.jpg', tags: ['✓ Art'], text: '内容...' }
};

// 【功能 A】左侧点击：平滑滚动
function scrollToId(id) {
    // 如果当前在详情页，先切换回列表页再滚动
    if (document.getElementById('gallery-view').style.display === 'none') {
        showGallery();
    }
    
    const el = document.getElementById(id);
    const container = document.getElementById('gal');
    if (el) {
        const offset = el.offsetTop - 70; // 减去 header 高度
        container.scrollTo({ top: offset, behavior: 'smooth' });
    }
}

// 【功能 B】右侧点击：进入详情页
function showDetail(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('d-client').innerText = data.client;
    document.getElementById('d-project').innerText = data.project;
    document.getElementById('d-year').innerText = data.year;
    document.getElementById('d-img').src = data.img;
    document.getElementById('d-text').innerText = data.text;
    
    const tagsUl = document.getElementById('d-tags');
    tagsUl.innerHTML = '';
    data.tags.forEach(tag => {
        const li = document.createElement('li');
        li.innerText = tag;
        tagsUl.appendChild(li);
    });

    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    document.getElementById('right-title').innerText = 'Work';
    document.getElementById('gal').scrollTo({ top: 0 });
}

// 【功能 C】返回列表
function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('right-title').innerText = 'Selected Work';
}

// 时钟和 Top 保持不变
function updateClock() {
    const timer = document.getElementById('timer');
    if (timer) timer.innerText = new Date().toTimeString().split(' ')[0];
}
setInterval(updateClock, 1000);
updateClock();

function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}
