const arenaChannel = "oobjects-z8bwpssc3kc";

window.onload = () => {
    loadArenaObjects();
    setInterval(updateClock, 1000);
    updateClock();
};

async function loadArenaObjects() {
    const grid = document.getElementById("objects-grid");
    try {
        const response = await fetch(`https://api.are.na/v2/channels/${arenaChannel}/contents?per=100`);
        const data = await response.json();
        
        // 渲染逻辑：只保留图片容器，去掉文字
        grid.innerHTML = data.contents
            .filter(block => block.class === "Image")
            .map(block => `
                <div class="object-item">
                    <div class="object-cover">
                        <img src="${block.image.display.url}">
                    </div>
                </div>
            `).join("");
    } catch (e) {
        console.error("Are.na Error");
    }
}

function updateClock() {
    const clock = document.getElementById('digital-clock');
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
}
