// Elements
const envelope = document.getElementById("envelope-container");
const photosContainer = document.getElementById("photos-container");
const nextToValentine = document.getElementById("next-to-valentine");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const typewriterElement = document.getElementById("typewriter-text");
const carouselPhotos = document.querySelectorAll(".carousel-photo");

// Heartfelt text sequence
const messages = [
    "hi baby <3",
    "sorry for the delay my love", 
    "the letter got misplaced at the post office 😅",
    "i just want to say that im so proud of us for reaching this point",
    "we've been through so much together", 
    "and yet here we are, stronger than ever",
    "we've had our ups and downs",
    "but every moment has been worth it because it brought us closer",
    "i know im not easy to love sometimes",
    "but you always show me so much patience and understanding",
    "for that, im eternally grateful",
    "every moment with you is a treasure. I love you so much! ❤️"
];

let currentMessageIndex = 0;
let currentPhotoIndex = 0;

// Audio
const bgMusic = new Audio('assets/song_1771037063858.mp3');
bgMusic.loop = true;

function typeWriter(text, i, callback) {
    if (i < text.length) {
        typewriterElement.innerHTML = text.substring(0, i + 1);
        setTimeout(() => typeWriter(text, i + 1, callback), 50);
    } else if (callback) {
        setTimeout(callback, 1000); // Wait 3s after text is done typing
    }
}

function startCarousel() {
    if (currentMessageIndex < messages.length) {
        // Update Photo
        carouselPhotos.forEach(p => p.classList.remove("active"));
        carouselPhotos[currentPhotoIndex].classList.add("active");
        currentPhotoIndex = (currentPhotoIndex + 1) % carouselPhotos.length;

        // Update Text
        typeWriter(messages[currentMessageIndex], 0, () => {
            currentMessageIndex++;
            if (currentMessageIndex < messages.length) {
                setTimeout(startCarousel, 500); // 1s gap before next message
            } else {
                // show Next button when messages finish
                nextToValentine.style.display = "inline-block";
            }
        });
    }
}

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    photosContainer.style.display = "flex";
    
    // Start music and carousel
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    startCarousel();
});

// Click Next
nextToValentine.addEventListener("click", () => {
    photosContainer.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        // add open to the specific letter window and raise z-index
        letterWindow.classList.add("open");
        document.getElementById("letter-container").style.zIndex = "200";
    }, 50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
});
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const letterWindow = document.querySelector("#letter-container .letter-window");
