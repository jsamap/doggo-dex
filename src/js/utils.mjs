// LOAD HEADER AND FOOTER
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#header");
    renderWithTemplate(headerTemplate, headerElement);

    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#footer");
    renderWithTemplate(footerTemplate, footerElement);
}

// ADDS FUNCTIONALITY TO THE HAMBURGER MENU
export function getNavBar() {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector(".navigation");
    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });
}

// SET THE CURRENT NAV ITEM ACTIVE
export function setActiveNav() {
    const currentPath = window.location.pathname.replace("/", "");
    const navLinks = document.querySelectorAll(".navigation a");

    navLinks.forEach((link) => {
        link.classList.remove("active");

        const linkPath = link.getAttribute("href").replace("/", "");
        if (linkPath === currentPath) {
            link.classList.add("active");
        }

        if (currentPath === "" && link.id === "home") {
            link.classList.add("active");
        }
    });
}

// LOAD HTML TEMPLATE
export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

// RENDER ELEMENT
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
    if (callback) {
        callback(data);
    }
}



// // wrapper for querySelector...returns matching element
// export function qs(selector, parent = document) {
//     return parent.querySelector(selector);
// }
// // or a more concise version if you are into that sort of thing:
// // export const qs = (selector, parent = document) => parent.querySelector(selector);

// // retrieve data from localstorage
// export function getLocalStorage(key) {
//     return JSON.parse(localStorage.getItem(key));
// }
// // save data to local storage
// export function setLocalStorage(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
// }
// // set a listener for both touchend and click
// export function setClick(selector, callback) {
//     qs(selector).addEventListener("touchend", (event) => {
//         event.preventDefault();
//         callback();
//     });
//     qs(selector).addEventListener("click", callback);
// }

// export function getParam(key) {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const value = urlParams.get(key);
//     return value;
// }

// export function renderListWithTemplate(
//     template,
//     parentElement,
//     list,
//     position = "afterbegin",
//     clear = true,
// ) {
//     const elements = list.map(template);
//     if (clear) {
//         parentElement.innerHTML = "";
//     }
//     parentElement.insertAdjacentHTML(position, elements.join(""));
// }

// export function renderWithTemplate(template, parentElement, data, callback) {
//     parentElement.innerHTML = template;
//     if (callback) {
//         callback(data);
//     }
// }


// export function setCartItemsNumber() {
//     const cartItems = getLocalStorage("so-cart");
//     document.getElementById("cart-count").textContent =
//         cartItems != null ? cartItems.length : 0;
// }
// export function getCartTotal() {
//     const cartItems = getCartItems();
//     let total = 0;
//     cartItems.forEach((item) => {
//         total += item.ListPrice;
//     });
//     return parseFloat(total.toFixed(2));
// }
// export function getCartItems() {
//     return getLocalStorage("so-cart");
// }
// export function clearCartItems() {
//     setLocalStorage("so-cart", []);
// }

// export function alertMessage(message, scroll = true) {
//     const alert = document.createElement("div");
//     alert.classList.add("alert");

//     const text = document.createElement("p");
//     text.textContent = message;

//     const close = document.createElement("a");
//     close.textContent = "✖";

//     const closeContainer = document.createElement("div");
//     closeContainer.appendChild(close);

//     alert.append(text, closeContainer);

//     closeContainer.addEventListener("click", function (e) {
//         main.removeChild(alert);
//     });

//     const main = document.querySelector("main");
//     main.prepend(alert);

//     if (scroll) window.scrollTo(0, 0);
// }

// // export function getCartItemsNumber(){
// //   return getCartItems().length;
// // }
// // export function calculateShippingCost(itemsNumber){
// //     let shippingCost = 0;
// //     for (let i = 0; i < itemsNumber; i++) {
// //         if (i == 0)
// //             shippingCost +=10;
// //         else
// //             shippingCost += 2;
// //     }
// //     return parseFloat(shippingCost.toFixed(2));
// // }
