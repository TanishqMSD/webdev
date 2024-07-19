document.addEventListener("DOMContentLoaded", function() {
    let typingEffect = new Typed("#textEx", {
        strings: ["TANISHQ", "CODER", "FULLSTACK DEV", "GAMER"],
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000
    });

    let dayNight = document.querySelector(".theme");
    let banner = document.querySelector(".banner");
    dayNight.addEventListener('click',()=>{
        banner.classList.toggle('night');
    })
});
