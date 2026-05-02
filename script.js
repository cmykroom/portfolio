/**
 * 项目详细数据
 * 备注：每个项目的 subImages 数组中包含 4 张图片的链接，对应详情页的 01, 02, 03, 04
 */
const projectData = {
    'p1': {
        client: 'SED_DO', 
        project: 'Ref. R/XTR-082', 
        year: '2049',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover1.jpg',
        tags: ['✓ Layout', '✓ Typography', '✓ 2049 Edition'],
        text: '这是项目 1 的描述。点击右侧图片或标题即可看到这段文字。',
        subImages: [
            'https://via.placeholder.com/600x400/eeeeee?text=01', 
            'https://via.placeholder.com/600x400/eeeeee?text=02', 
            'https://via.placeholder.com/600x400/eeeeee?text=03', 
            'https://via.placeholder.com/600x400/eeeeee?text=04'
        ]
    },
    'p2': {
        client: 'SED_DO', 
        project: 'R/PRT-017', 
        year: '2048',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover2.jpg',
        tags: ['✓ Identity', '✓ Print'],
        text: '这是项目 2 的描述内容。',
        subImages: [
            'https://via.placeholder.com/600x400/eeeeee?text=01', 
            'https://via.placeholder.com/600x400/eeeeee?text=02', 
            'https://via.placeholder.com/600x400/eeeeee?text=03', 
            'https://via.placeholder.com/600x400/eeeeee?text=04'
        ]
    },
    'p3': { 
        client: 'SED_DO', project: 'Ref. R/CXX-500', year: '2047', 
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover3.jpg', 
        tags: ['✓ Web'], text: '项目 3 详情。',
        subImages: ['链接1', '链接2', '链接3', '链接4']
    },
    'p4': { 
        client: 'SED_DO', project: 'Ref. R/ANV-310', year: '2046', 
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover4.jpg', 
        tags: ['✓ Art'], text: '项目 4 详情。',
        subImages: ['链接1', '链接2', '链接3', '链接4']
    },
    'p5': { 
        client: 'SED_DO', project: 'Ref. R/FTH-053', year: '2045', 
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover5.jpg', 
        tags: ['✓ Book'], text: '项目 5 详情。',
        subImages: ['链接1', '链接2', '链接3', '链接4']
    }
};

/**
 * 【功能 1】左侧项目列表点击滚动
 */
function scrollToId(id) {
    // 如果当前在详情页或信息页，点击左侧列表应先返回首页视图
    showGallery();
    
    const container = document.getElementById('gal');
    const target = document.getElementById(id);
    if (target) {
        const topPos = target.offsetTop - 60; 
        container.scrollTo({ top: topPos, behavior: 'smooth' });
    }
}

/**
 * 【功能 2】右侧点击进入详情页
 */
function showDetail(id) {
    const data = projectData[id];
    if (!data) return;

    // 1. 填充文字和主图
    document.getElementById('d-client').innerText = data.client;
    document.getElementById('d-project').innerText = data.project;
    document.getElementById('d-year').innerText = data.year;
    document.getElementById('d-img').src = data.img;
    document.getElementById('d-text').innerText = data.text;
    
    // 2. 填充标签
    const tagsUl = document.getElementById('d-tags');
    tagsUl.innerHTML = '';
    data.tags.forEach(tag => {
        const li = document.createElement('li');
        li.innerText = tag;
        tagsUl.appendChild(li);
    });

    // 3. 填充 4 张辅助小图
    if (data.subImages && data.subImages.length === 4) {
        for (let i = 1; i <= 4; i++) {
            const subImgEl = document.getElementById(`sub-img-${i}`);
            if (subImgEl) {
                subImgEl.src = data.subImages[i - 1];
            }
        }
    }

    // 4. 视图切换
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none'; // 确保关闭信息页
    document.getElementById('detail-view').style.display = 'block';
    
    // 5. 标题与 Index 按钮处理
    document.getElementById('right-title').innerText = 'Project Detail';
    document.getElementById('index-btn').style.display = 'none'; // 详情页隐藏 Index
    
    document.getElementById('gal').scrollTo({ top: 0 });
}

/**
 * 【功能 3】返回列表 (首页)
 */
function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'none';
    
    // 标题恢复，且隐藏 Index 按钮
    document.getElementById('right-title').innerText = 'Selected Work';
    document.getElementById('index-btn').style.display = 'none';
}

/**
 * 【功能 4】显示 Information 页面
 */
function showInfo() {
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('info-view').style.display = 'block';
    
    // 切换标题为 Profile，并显示右上角的 Index 按钮
    document.getElementById('right-title').innerText = 'Profile';
    document.getElementById('index-btn').style.display = 'block';
    
    document.getElementById('gal').scrollTo({ top: 0 });
}

/**
 * 辅助功能：时钟
 */
function updateClock() {
    const el = document.getElementById('timer');
    if (el) el.innerText = new Date().toTimeString().split(' ')[0];
}
setInterval(updateClock, 1000);
updateClock();

/**
 * 辅助功能：滚动到顶
 */
function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}
