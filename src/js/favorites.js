import { getLocalStorage, loadHeaderFooter, getNavBar, setActiveNav, setFavoritesCount } from "./utils.mjs";
import FavoritesList from "./FavoritesList";

async function init() {
    await loadHeaderFooter();
    getNavBar();
    setActiveNav();
    setFavoritesCount();

    renderFavorites();
}
init();

function renderFavorites() {
  const dataSource = getLocalStorage("dd-favorites");
  const listElement = document.querySelector("#favorites-list");

  const favoritesList = new FavoritesList(dataSource, listElement);
  favoritesList.init();
}
