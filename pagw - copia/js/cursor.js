const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

/* MOUSE REAL */
document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

cursor.style.left = mouseX + "px";
cursor.style.top = mouseY + "px";
});

/* HALO SUAVIZADO */
function animateFollower() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

follower.style.left = followerX + "px";
follower.style.top = followerY + "px";

    requestAnimationFrame(animateFollower);
}

animateFollower();

/* HOVER EN LINKS Y BOTONES */
const hoverItems = document.querySelectorAll("a, button");

hoverItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        follower.style.width = "65px";
        follower.style.height = "65px";

        follower.style.boxShadow = `
            0 0 20px #00ffc3,
            0 0 50px rgba(0,255,200,0.6),
            0 0 100px rgba(120,0,255,0.4)
        `;

        follower.style.border = `
            1px solid rgba(0,255,200,0.7)
        `;
    });

    item.addEventListener("mouseleave", () => {

        follower.style.width = "42px";
        follower.style.height = "42px";

        follower.style.boxShadow = `
            0 0 15px rgba(0,255,208,0.4),
            0 0 35px rgba(0,255,208,0.25),
            0 0 80px rgba(120,0,255,0.25)
        `;

        follower.style.border = `
            1px solid rgba(0,255,208,0.3)
        `;
    });
});