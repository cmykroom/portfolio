document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 点击左侧表格行跳转到右侧对应项目
    const tableRows = document.querySelectorAll('.project-table tbody tr');
    const galleryScrollContainer = document.getElementById('gal');

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

    // 2. 实时时钟功能 (toLocaleTimeString 格式更整洁)
    const timerElement = document.getElementById('timer');
    function updateClock() {
        const now = new Date();
        timerElement.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 3. 回到顶部功能
    const topButton = document.getElementById('back-to-top');
    topButton.addEventListener('click', (e) => {
        e.preventDefault();
        galleryScrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
