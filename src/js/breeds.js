import { loadHeaderFooter, getNavBar, setActiveNav, setFavoritesCount } from "./utils.mjs";
import { TheDogApiService, ApiNinjaService } from "./ExternalServices.mjs";
import BreedList from "./BreedList";
import BreedDetail from "./BreedDetail";

async function init() {
    await loadHeaderFooter();
    getNavBar();
    setActiveNav();
    setFavoritesCount();

    let dataSource = new TheDogApiService();
    const breedSelect = document.querySelector("#breed-select");
    const breedContainer = document.querySelector("#breed-details");
    const breedList = new BreedList(dataSource, breedSelect);
    breedList.init();

    let ratingDataSource = new ApiNinjaService();
    const ratingContainer = document.querySelector("#breed-rating");
    ratingContainer.innerHTML = "";

    const selectMenu = document.getElementById("breed-select");
    selectMenu.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        console.log("Selected option:", selectedValue);
        const [ id, name ] = selectedValue.split("|");
        console.log(`id: '${id}'; name: '${name}'`);
        
        ratingContainer.innerHTML = "";
        
        const breedDetail = new BreedDetail(id, dataSource, breedContainer, ratingDataSource, ratingContainer);
        breedDetail.init();

    });


}
init();
