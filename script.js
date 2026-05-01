
/* =========================================================
   PROJECT CLICK SCROLL
========================================================= */

function scrollToProject(id, element){
    const target = document.getElementById(id);
    const scrollArea = document.getElementById("scrollArea");

    if (!target || !scrollArea) return;

    scrollArea.scrollTo({
        top: target.offsetTop - 20,
        behavior: "smooth"
    });

    document.querySelectorAll(".project-item").forEach(item=>{
        item.classList.remove("active");
    });

    element.classList.add("active");
}


/* =========================================================
   CLOCK
========================================================= */

function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB');
    const clockEl = document.getElementById("clock");

    if(clockEl){
        clockEl.innerText = time;
    }
}

setInterval(updateClock,1000);
updateClock();


/* =========================================================
   SCROLL ACTIVE SYNC
========================================================= */

const scrollArea = document.getElementById("scrollArea");
const blocks = document.querySelectorAll(".project-block");
const navItems = document.querySelectorAll(".project-item");

if (scrollArea) {
    scrollArea.addEventListener("scroll", ()=>{

        let current = "";

        blocks.forEach(block=>{
            const blockTop = block.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top;

            if(blockTop <= 200){
                current = block.getAttribute("id");
            }
        });

        navItems.forEach(item=>item.classList.remove("active"));

        if(current==="p1") navItems[0]?.classList.add("active");
        if(current==="p2") navItems[1]?.classList.add("active");
        if(current==="p3") navItems[2]?.classList.add("active");
        if(current==="p4") navItems[3]?.classList.add("active");
        if(current==="p5") navItems[4]?.classList.add("active");

    });
}


/* =========================================================
   TOP BUTTON FIX（关键修复）
========================================================= */

function scrollToTop(){
    const scrollArea = document.getElementById("scrollArea");

    if(scrollArea){
        scrollArea.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}
