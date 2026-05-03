const arenaChannel = "oobjects-z8bwpssc3kc";

window.onload = () => {
    loadArenaObjects();
    updateClock();
    setInterval(updateClock, 1000); // 启动页脚时钟
};

// 1. 调用 Are.na 数据
async function loadArenaObjects() {
    const grid = document.getElementById("objects-grid");
    if (!grid) return;

    try {
        const response = await fetch(`https://api.are.na/v2/channels/${arenaChannel}/contents?per=100`);
        const data = await response.json();

        const imageBlocks = data.contents.filter(block =>
            block.class === "Image" && block.image && block.image.original && block.image.original.url
        );

        grid.innerHTML = imageBlocks.map((block, index) => `
            <div class="object-item">
                <div class="object-cover">
                    <img src="${block.image.original.url}" alt="${block.title || 'OBJECT'}">
                </div>
                <div class="object-name">
                    ${block.title || `OBJECT_${String(index + 1).padStart(2, '0')}`}
                </div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Are.na 数据读取失败:", error);
        grid.innerHTML = `<div style="padding:40px 0;">Unable to load objects.</div>`;
    }
}

// 2. 页脚数字时钟逻辑
function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    if (!clockElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    clockElement.textContent = timeString;
}
