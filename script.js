// 1. 作品数据库：在这里添加你的文字内容
const projectData = {
    'p1': {
        client: 'SED_DO',
        project: 'Ref. R/XTR-082',
        year: '2049',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover1.jpg',
        tags: ['✓ Vivamus sed', '✓ Tr. Aliquam', '✓ Publisher: Querido', '✓ Design: Quisque'],
        text: 'Cras ut dictum mi. Sed quis lorem semper, elementum mauris vitae, consectetur orci. Cras volutpat eget elit porta facilisis. Aenean fermentum arcu mauris, eu faucibus nisl blandit ac. Proin eget euismod mauris.'
    },
    'p2': {
        client: 'SED_DO',
        project: 'R/PRT-017',
        year: '2048',
        img: 'https://raw.githubusercontent.com/cmykroom/portfolio/main/images/cover2.jpg',
        tags: ['✓ Creative Direction', '✓ Typography'],
        text: '这里是关于第二个项目的描述文字...'
    }
    // 后面以此类推...
};

// 2. 切换到详情函数
function to(id) {
    const data = projectData[id];
    if (!data) return;

    // 填充内容
    document.getElementById('d-client').innerText = data.client;
    document.getElementById('d-project').innerText = data.project;
    document.getElementById('d-year').innerText = data.year;
    document.getElementById('d-img').src = data.img;
    document.getElementById('d-text').innerText = data.text;
    
    // 填充标签列表
    const tagsUl = document.getElementById('d-tags');
    tagsUl.innerHTML = '';
    data.tags.forEach(tag => {
        const li = document.createElement('li');
        li.innerText = tag;
        tagsUl.appendChild(li);
    });

    // 视觉切换
    document.getElementById('gallery-view').style.display = 'none';
    document.getElementById('detail-view').style.display = 'block';
    document.getElementById('right-title').innerText = 'Work';
    
    // 滚动到顶部
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. 返回列表函数
function showGallery() {
    document.getElementById('gallery-view').style.display = 'block';
    document.getElementById('detail-view').style.display = 'none';
    document.getElementById('right-title').innerText = 'Selected Work';
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}

// 4. 其他原有功能（时钟等）
function updateClock() {
    const timer = document.getElementById('timer');
    if (timer) {
        const now = new Date();
        timer.innerText = now.toTimeString().split(' ')[0];
    }
}
setInterval(updateClock, 1000);
updateClock();

function scrollToTop() {
    document.getElementById('gal').scrollTo({ top: 0, behavior: 'smooth' });
}
