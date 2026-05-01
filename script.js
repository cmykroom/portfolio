document.addEventListener('DOMContentLoaded', () => {
    
    const tableRows = document.querySelectorAll('.project-table tbody tr');
    const galleryScrollContainer = document.getElementById('gal');

    // 点击左侧跳转
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

    // 实时时钟
    const timerElement = document.getElementById('timer');
    function updateClock() {
        const now = new Date();
        timerElement.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 回到顶部 (针对右侧滚动容器)
    const topButton = document.getElementById('back-to-top');
    topButton.addEventListener('click', (e) => {
        e.preventDefault();
        galleryScrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
