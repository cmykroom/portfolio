document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 点击左侧列表，右侧滑动到对应位置
    const tableRows = document.querySelectorAll('.project-table tbody tr');
    const galleryContainer = document.getElementById('gallery');

    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            const targetId = row.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. 底部实时时钟功能
    const clockElement = document.getElementById('clock');
    
    function updateTime() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${h}:${m}:${s}`;
    }

    setInterval(updateTime, 1000);
    updateTime();

    // 3. 回到顶部功能
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        galleryContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
