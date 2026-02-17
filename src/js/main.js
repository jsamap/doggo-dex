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



