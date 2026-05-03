const arenaChannel = "oobjects-z8bwpssc3kc";

window.onload = () => {
    loadArenaGallery();
};

async function loadArenaGallery() {
    const grid = document.getElementById("objects-grid");
    if (!grid) return;

    try {
        const response = await fetch(`https://api.are.na/v2/channels/${arenaChannel}/contents?per=100`);
        const data = await response.json();

        const imageBlocks = data.contents.filter(block =>
            block.class === "Image" &&
            block.image &&
            block.image.original &&
            block.image.original.url
        );

        grid.innerHTML = imageBlocks.map((block, index) => `
            <div class="object-item">
                <div class="object-cover">
                    <img src="${block.image.original.url}" alt="GALLERY_${String(index + 1).padStart(2, '0')}">
                </div>
                <div class="object-name">GALLERY_${String(index + 1).padStart(2, '0')}</div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Are.na 数据读取失败:", error);
        grid.innerHTML = `<div style="padding:40px 0;">Unable to load gallery.</div>`;
    }
}
