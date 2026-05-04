/**
 * GALLERY.JS
 * 功能：调用 Are.na 图片，每 15 个（5x3）自动分页，包含实时时钟逻辑
 */

const arenaChannel = "oobjects-z8bwpssc3kc"; // 你的 Are.na 频道 ID
const ITEMS_PER_PAGE = 15; // 每页显示 15 个（5列 * 3排）

window.onload = () => {
    loadArenaObjects();
    updateClock();
    setInterval(updateClock, 1000); // 启动页脚时钟
};

/**
 * 核心功能：获取 Are.na 内容并按 5x3 分页渲染
 */
async function loadArenaObjects() {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    try {
        // 1. 请求 Are.na API
        const response = await fetch(`https://api.are.na/v2/channels/${arenaChannel}/contents?per=100`);
        const data = await response.json();

        // 2. 过滤图片
        const imageBlocks = data.contents.filter(block =>
            block.class === "Image" && block.image && block.image.display && block.image.display.url
        );

        // 3. 清空现有内容
        scrollContainer.innerHTML = "";

        // 4. 分页逻辑：每 15 个 block 创建一个 .objects-grid
        for (let i = 0; i < imageBlocks.length; i += ITEMS_PER_PAGE) {
            const pageData = imageBlocks.slice(i, i + ITEMS_PER_PAGE);
            
            // 创建这一页的 grid 容器
            const gridPage = document.createElement("div");
            gridPage.className = "objects-grid";

            // 生成这一页的内部 HTML
            gridPage.innerHTML = pageData.map((block, index) => {
                const globalIndex = i + index + 1; // 全局编号
                const formattedNumber = String(globalIndex).padStart(2, '0');
                
                return `
                    <div class="object-item">
                        <div class="object-cover">
                            <img src="${block.image.display.url}" alt="OBJECT_${formattedNumber}">
                        </div>
                        <div class="object-number">
                            ${formattedNumber}
                        </div>
                    </div>
                `;
            }).join("");

            // 将这一页添加到滚动容器中
            scrollContainer.appendChild(gridPage);
        }

        // 如果没有任何图片
        if (imageBlocks.length === 0) {
            scrollContainer.innerHTML = `<div style="padding:40px; font-size: 11px;">NO OBJECTS FOUND.</div>`;
        }

    } catch (error) {
        console.error("Are.na 数据读取失败:", error);
        scrollContainer.innerHTML = `<div style="padding:40px; font-size: 11px;">UNABLE TO LOAD OBJECTS.</div>`;
    }
}

/**
 * 页脚时钟逻辑
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
