// 项目详细数据
const projectData = {
    'p1': {
        client: 'SED_DO', project: 'Ref. R/XTR-082', year: '2049',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover1.jpg',
        tags: ['✓ Layout', '✓ Typography', '✓ 2049 Edition'],
        text: '这是项目 1 的描述。点击右侧图片或标题即可看到这段文字。'
    },
    'p2': {
        client: 'SED_DO', project: 'R/PRT-017', year: '2048',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover2.jpg',
        tags: ['✓ Identity', '✓ Print'],
        text: '这是项目 2 的描述内容。'
    },
    'p3': { client: 'SED_DO', project: 'Ref. R/CXX-500', year: '2047', img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover3.jpg', tags: ['✓ Web'], text: '项目 3 详情。' },
    'p4': { client: 'SED_DO', project: 'Ref. R/ANV-310', year: '2046', img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover4.jpg', tags: ['✓ Art'], text: '项目 4 详情。' },
    'p5': { client: 'SED_DO', project: 'Ref. R/FTH-053', year: '2045', img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover5.jpg', tags: ['✓ Book'], text: '项目 5 详情。' }
};

// 【功能 1】左侧点击滚动
function scrollToId(id) {
    // 如果在详情页，点击左侧列表应先返回列表视图
    showGallery();
    
    const container = document.getElementById('gal');
    const target = document.getElementById(id);
    if (target) {
        const topPos = target.offsetTop - 70; // 70px 是 header 高度
        container.scrollTo({ top: topPos, behavior: 'smooth' });
    }
}

// 【功能 2】右侧点击进入详情
function showDetail(id) {
    const data = projectData[id];
    if (!data) return;

    // 填充详情内容
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

    // 视图切换
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    document.getElementById('right-title').innerText = 'Project Detail';
    document.getElementById('gal').scrollTo({ top: 0 });
}

// 【功能 3】返回列表
function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('right-title').innerText = 'Selected Work';
}

// 辅助功能：时钟
function updateClock() {
    const el = document.getElementById('timer');
    if (el) el.innerText = new Date().toTimeString().split(' ')[0];
}
setInterval(updateClock, 1000);
updateClock();

// 辅助功能：滚动到顶
function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}
