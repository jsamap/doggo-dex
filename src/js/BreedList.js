import { renderOptionsWithTemplate } from "./utils.mjs";

export default class BreedList {
    constructor (dataSource, selectElement){
        this.dataSource = dataSource;
        this.selectElement = selectElement;
    }
    
    async init(){
        const breedsData = await this.dataSource.getAllBreeds();
        this.renderOptions(breedsData);
    }

    breedOptionTemplate(breed){
        return (
          `<option value="${breed.id}|${breed.name}">${breed.name}</option>`
        );
    }

    renderOptions(breeds){
        renderOptionsWithTemplate(this.breedOptionTemplate, this.selectElement, breeds, "afterbegin", false);
    }
}