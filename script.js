document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // 获取目标 ID
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // 平滑滚动到目标位置
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // 可选：更新左侧文字颜色
            document.querySelectorAll('.nav-item').forEach(el => el.style.opacity = '1');
            this.style.opacity = '0.4';
        }
    });
});
