const projectData = {
    'p1': {
        client: 'SED_DO', project: 'Ref. R/XTR-082', year: '2049',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover1.jpg',
        tags: ['✓ Layout Design', '✓ Typography', '✓ 240 Pages'],
        text: '这是第一个项目的详细描述。探索了未来主义排版与网格系统的结合。'
    },
    'p2': {
        client: 'SED_DO', project: 'R/PRT-017', year: '2048',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover2.jpg',
        tags: ['✓ Branding', '✓ Logotype'],
        text: '第二个项目侧重于品牌身份的构建，采用了极简的视觉语言。'
    },
    'p3': {
        client: 'SED_DO', project: 'Ref. R/CXX-500', year: '2047',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover3.jpg',
        tags: ['✓ Web Design', '✓ Interaction'],
        text: '第三个项目是一个交互式的数字化体验设计。'
    },
    'p4': {
        client: 'SED_DO', project: 'Ref. R/ANV-310', year: '2046',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover4.jpg',
        tags: ['✓ Editorial', '✓ Print'],
        text: '第四个项目是一本关于城市摄影的画册设计。'
    },
    'p5': {
        client: 'SED_DO', project: 'Ref. R/FTH-053', year: '2045',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover5.jpg',
        tags: ['✓ Exhibition', '✓ Signage'],
        text: '第五个项目是为美术馆设计的导视系统。'
    }
};

function to(id) {
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
    document.getElementById('right-title').innerText = 'Work Content';
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('right-title').innerText = 'Selected Work';
}

function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

// 保持原有时钟
setInterval(() => {
    const timer = document.getElementById('timer');
    if (timer) timer.innerText = new Date().toTimeString().split(' ')[0];
}, 1000);
