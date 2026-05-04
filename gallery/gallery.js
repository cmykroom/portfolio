/**
 * GALLERY.JS
 */
const arenaChannel = "oobjects-z8bwpssc3kc"; 
const ITEMS_PER_PAGE = 15; // 5列 * 3排

window.onload = () => {
    loadArenaObjects();
    updateClock();
    setInterval(updateClock, 1000);
};

async function loadArenaObjects() {
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    try {
        const response = await fetch(`https://api.are.na/v2/channels/${arenaChannel}/contents?per=100`);
        const data = await response.json();
        const imageBlocks = data.contents.filter(block =>
            block.class === "Image" && block.image && block.image.display && block.image.display.url
        );

        scrollContainer.innerHTML = "";

        for (let i = 0; i < imageBlocks.length; i += ITEMS_PER_PAGE) {
            const pageData = imageBlocks.slice(i, i + ITEMS_PER_PAGE);
            const gridPage = document.createElement("div");
            gridPage.className = "objects-grid";

            gridPage.innerHTML = pageData.map((block, index) => {
                const globalIndex = i + index + 1;
                const num = String(globalIndex).padStart(2, '0');
                return `
                    <div class="object-item">
                        <div class="object-cover">
                            <img src="${block.image.display.url}" alt="OBJ_${num}">
                        </div>
                        <div class="object-number">${num}</div>
                    </div>
                `;
            }).join("");

            scrollContainer.appendChild(gridPage);
        }
    } catch (error) {
        console.error("加载失败:", error);
    }
}

function updateClock() {
    const el = document.getElementById('digital-clock');
    if (!el) return;
    el.textContent = new Date().toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
