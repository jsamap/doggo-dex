import { DogApiService, TheDogApiService } from "./ExternalServices.mjs";
import { loadHeaderFooter, getNavBar, setActiveNav } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    getNavBar();
    setActiveNav();

    const dogDataSource = new DogApiService();
    const fact = await  dogDataSource.getRandomFact();
    document.querySelector("#fact").textContent = fact;
    
    const theDogDataSource = new TheDogApiService();
    const picture = await theDogDataSource.getRandomPicture();
    document.querySelector("#picture").src = picture;
}
init();



const factCard = document.getElementById("fact-card");
const pictureCard = document.getElementById("picture-card");
const overlay = document.querySelector(".overlay");
const factClose = document.querySelector("#fact-close");
const pictureClose = document.querySelector("#picture-close");

// Open (flip + expand)
factCard.addEventListener("click", () => {
  factCard.classList.add("flipped", "modal-active");
  overlay.classList.add("active");
});

// Open (flip + expand)
pictureCard.addEventListener("click", () => {
  pictureCard.classList.add("flipped", "modal-active");
  overlay.classList.add("active");
});

// Close with button
factClose.addEventListener("click", (event) => {
  event.stopPropagation(); // prevent re-triggering card click
  factCard.classList.remove("flipped", "modal-active");
  overlay.classList.remove("active");
});
pictureClose.addEventListener("click", (event) => {
  event.stopPropagation(); // prevent re-triggering card click
  pictureCard.classList.remove("flipped", "modal-active");
  overlay.classList.remove("active");
});

// Close with overlay
overlay.addEventListener("click", () => {
  factCard.classList.remove("flipped", "modal-active");
  overlay.classList.remove("active");
});




// SET MESSAGE FOR LAST VISIT
const lastVisitElement = document.querySelector('#lastVisit p');
const lastVisit = window.localStorage.getItem("dd-lastvisit");
const today = new Date();

if (lastVisit == null) {
    lastVisitElement.textContent = 'Welcome! We hope you find the information you need.';
} else {
    const lastVisitDate = new Date(lastVisit);
    
    const daysDiff = Math.floor((today - lastVisitDate) / (1000 * 60 * 60 * 24));
    if (daysDiff < 1) {
        lastVisitElement.textContent = "It's good to see you back so soon!";
    } else {
        if (daysDiff == 1) {
            lastVisitElement.textContent = `You last visited ${daysDiff} day ago.`;
        } else {
            lastVisitElement.textContent = `You last visited ${daysDiff} days ago.`;
        }
    }
}
localStorage.setItem("dd-lastvisit", today);

// LAST VISIT MODAL - OPEN / CLOSE
const visitContainer = document.getElementById("lastVisit");

document.getElementById("visitClose").addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("main").removeChild(visitContainer);    
});
