import { loadHeaderFooter, getNavBar, setActiveNav } from "./utils.mjs";

async function init() {
    await loadHeaderFooter();
    getNavBar();
    setActiveNav();

}
init();

