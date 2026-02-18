import{h as s,l as i,g as r,s as o,b as n,a as l}from"./utils-DM9Wm1Jm.js";class c{constructor(t,a){this.dataSource=t,this.listElement=a}async init(){this.renderFavorites(this.dataSource)}favoriteTemplate(t){return`<li class="">
                <div class="">
                    <img src="${t.image.url}" alt="${t.Name}" />
                    <h3>${t.name}</h3>
                </div>
            </li>`}renderFavorites(t){s(this.favoriteTemplate,this.listElement,t)}}async function v(){await i(),r(),o(),n(),d()}v();function d(){const e=l("dd-favorites"),t=document.querySelector("#favorites-list");new c(e,t).init()}
