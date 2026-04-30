const projects = {
    1: {
        client: "01",
        title: "Project 01",
        year: "2024",
        image: "images/cover1.jpg",
        link: "project1.html"
    },
    2: {
        client: "02",
        title: "Project 02",
        year: "2023",
        image: "images/cover2.jpg",
        link: "project2.html"
    },
    3: {
        client: "03",
        title: "Project 03",
        year: "2022",
        image: "images/cover3.jpg",
        link: "project3.html"
    },
    4: {
        client: "04",
        title: "Project 04",
        year: "2021",
        image: "images/cover4.jpg",
        link: "project4.html"
    },
    5: {
        client: "05",
        title: "Project 05",
        year: "2020",
        image: "images/cover5.jpg",
        link: "project5.html"
    }
};

function showProject(num){
    document.getElementById("previewClient").innerText = projects[num].client;
    document.getElementById("previewTitle").innerText = projects[num].title;
    document.getElementById("previewYear").innerText = projects[num].year;
    document.getElementById("previewImage").src = projects[num].image;
    document.getElementById("projectLink").href = projects[num].link;

    document.querySelectorAll(".project-item").forEach(item=>{
        item.classList.remove("active");
    });

    document.querySelectorAll(".project-item")[num-1].classList.add("active");
}

function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB');
    document.getElementById("clock").innerText = time;
}

setInterval(updateClock,1000);
updateClock();
