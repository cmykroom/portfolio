document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 点击左侧行，右侧滚动到对应 ID
    const tableRows = document.querySelectorAll('.project-table tbody tr');
    const scrollContainer = document.querySelector('.right-panel .scroll-content');

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

    // 2. 实时时钟
    const clockElement = document.getElementById('clock');
    function updateTime() {
        const now = new Date();
        const timeStr = [now.getHours(), now.getMinutes(), now.getSeconds()]
                        .map(n => String(n).padStart(2, '0')).join(':');
        clockElement.textContent = timeStr;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // 3. 回到顶部
    document.getElementById('back-to-top').addEventListener('click', (e) => {
        e.preventDefault();
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
