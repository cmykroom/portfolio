/**
 * GALLERY.JS
 * 功能：调用 Are.na 图片并实现 01, 02... 自动编号，包含页脚实时时钟逻辑
 */

const arenaChannel = "oobjects-z8bwpssc3kc"; // 你的 Are.na 频道 ID

window.onload = () => {
    loadArenaObjects();
    updateClock();
    setInterval(updateClock, 1000); // 启动页脚时钟，每秒更新一次
};

/**
 * 核心功能：获取 Are.na 内容并渲染到 5 列网格中
 */
async function loadArenaObjects() {
    const grid = document.getElementById("objects-grid");
    if (!grid) return;

    try {
        // 请求 Are.na API，获取最多 100 个内容块
        const response = await fetch(`https://api.are.na/v2/channels/${arenaChannel}/contents?per=100`);
        const data = await response.json();

        // 过滤出图片类型的内容块
        const imageBlocks = data.contents.filter(block =>
            block.class === "Image" && block.image && block.image.display && block.image.display.url
        );

        // 将图片和自动生成的数字编号（01, 02...）注入 HTML
        grid.innerHTML = imageBlocks.map((block, index) => `
            <div class="object-item">
                <div class="object-cover">
                    <img src="${block.image.display.url}" alt="OBJECT_${String(index + 1).padStart(2, '0')}">
                </div>
                <div class="object-number">
                    ${String(index + 1).padStart(2, '0')}
                </div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Are.na 数据读取失败:", error);
        grid.innerHTML = `<div style="padding:40px 0; font-size: 11px;">UNABLE TO LOAD OBJECTS.</div>`;
    }
}

/**
 * 页脚时钟逻辑：同步主页 00:00:00 格式
 */
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
