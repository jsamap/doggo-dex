import { renderListWithTemplate } from "./utils.mjs";

export default class FavoritesList {
    constructor (dataSource, listElement){
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    
    async init(){
        this.renderFavorites(this.dataSource)
    }

    favoriteTemplate(item) {
        return (
            `<li class="">
                <div class="">
                    <img src="${item.image.url}" alt="${item.Name}" />
                    <h3>${item.name}</h3>
                </div>
            </li>`
        );
    }
    

    renderFavorites(favorites){
        renderListWithTemplate(this.favoriteTemplate, this.listElement, favorites);
    }
}