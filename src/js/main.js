import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getNavBar, setActiveNav } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    getNavBar();
    setActiveNav();

    const dataSource = new ExternalServices();
    const fact = await  dataSource.getRandomFact();
    document.querySelector("#fact").textContent = fact;
    
    const picture = await dataSource.getRandomPicture();
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