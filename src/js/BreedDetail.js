import { renderBreedWithTemplate, invertRatingScore, getLocalStorage, setLocalStorage, setFavoritesCount, increaseFavoritesCount, decreaseFavoritesCount } from "./utils.mjs";

export default class BreedDetail {
    constructor (breed_id, detailDataSource, detailElement, ratingDataSource, ratingElement){
        this.breed_id = breed_id;
        this.detailDataSource = detailDataSource;
        this.detailElement = detailElement;
        this.ratingDataSource = ratingDataSource;
        this.ratingElement = ratingElement;
        this.breedDetail = {};
    }
    
    async init(){
        this.breedDetail = await this.detailDataSource.getBreedById(this.breed_id);
        const ratingData = await this.ratingDataSource.getBreedByName(this.breedDetail.name);
        
        console.log(this.breedDetail);
        console.log(ratingData);
        this.renderBreed(this.breedDetail, ratingData);
        
        const favButton = document.getElementById("addFavorite");
        favButton.addEventListener("click", this.addFavorite.bind(this));

        const ratingExpandButton = document.getElementById("button-expand");
        const ratingDetailsSection = document.getElementById("rating-details");
        ratingExpandButton.addEventListener("click", () => {
            ratingExpandButton.classList.toggle("rotated");
            console.log(ratingDetailsSection)
            ratingDetailsSection.classList.toggle("hidden");
            ratingDetailsSection.classList.toggle("rating-details");
        });

    }

    addFavorite() {
        const favorites = getLocalStorage("dd-favorites") || [];

        const index = favorites.findIndex(fav => fav.id === this.breedDetail.id);

        let favButton = document.getElementById("addFavorite");

        if (index === -1) {
            favorites.push(this.breedDetail);

            favButton.classList.remove("text-white");
            favButton.classList.add("text-red");
            
            favButton.classList.add("glow-red");

            favButton.addEventListener("animationend", () => {
                favButton.classList.remove("glow-red");
            }, { once: true });

            increaseFavoritesCount()
            setFavoritesCount()

        } else {
            favorites.splice(index, 1);
    
            favButton.classList.remove("text-red");
            favButton.classList.add("text-white");

            decreaseFavoritesCount()
            setFavoritesCount()
        }

        setLocalStorage("dd-favorites", favorites);

    }

    breedDetailTemplate(breed){
        const favorites = getLocalStorage("dd-favorites") || [];
        const index = favorites.findIndex(fav => fav.id === breed.id);
        
        return (
          `
            <div class="profile-picture">
                <img src="${breed.image.url}" alt="${breed.name}">
                
                <div class="button-container">
                    <button class="${index>-1 ?"text-red":"text-white"}" id="addFavorite">FAVORITE ❤️</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>Breed:</th>
                    <td>${breed.name}</td>
                </tr>
                <tr>
                    <th>Life span:</th>
                    <td>${breed.life_span} years</td>
                </tr>
                <tr>
                    <th>Temperament:</th>
                    <td>${breed.temperament}</td>
                </tr>
                <tr>
                    <th>Origin:</th>
                    <td>${breed.origin}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>${breed.description}</td>
                </tr>
                <tr>
                    <th>Weight:</th>
                    <td><p>${breed.weight.metric.split(";")[0]} kg</p><p>${breed.weight.metric.split(";")[1]} kg</p></td>
                </tr>
                <tr>
                    <th>Height:</th>
                    <td><p>${breed.height.metric.split(";")[0]} cm</p><p>${breed.height.metric.split(";")[1]} cm</p></td>
                </tr>
                <tr>
                    <th>Breed Group:</th>
                    <td>${breed.breed_group}</td>
                </tr>
            </table>
          `
        );
    }
    
    breedRatingTemplate(rating){
        const scoresList = [
            [ "Good with children", rating.good_with_children], 
            [ "Good with dogs", rating.good_with_other_dogs],
            [ "Good with strangers", rating.good_with_strangers],
            [ "Shedding", invertRatingScore(rating.shedding)],
            [ "Grooming", invertRatingScore(rating.grooming)],
            [ "Drooling", invertRatingScore(rating.drooling)],
            [ "Playfulness", rating.playfulness],
            [ "Protectiveness", rating.protectiveness],
            [ "Trainability", rating.trainability],
            [ "Energy", rating.energy],
            [ "Loudness", invertRatingScore(rating.barking)]
        ];
        const average = parseFloat((
            scoresList.reduce((sum, [, value]) => sum + value, 0) / scoresList.length
        ).toFixed(1));
        

        let ratingElement =  `
           <div class="overall-rating">
                <h3>Overall Rating: ${average}</h3>
                <hr>
                <div id="breed-rating">
        `
        
        const whole = Math.trunc(average);
        const decimal = (average-whole).toFixed(1);

        for (let i = 1; i <= whole; i++) {
            ratingElement += 
        `
                    <img src="/images/icons/star-gold.svg" alt="star" class="star">
        `
        }
        if (decimal>0) {
            ratingElement += 
        `
                    <img src="/images/icons/star-gold.svg" alt="star" class="star half-star" style="--percent:${decimal}" >
        `   
        }

                     
        ratingElement += 
        `
                </div>
                <hr>
                <button id="button-expand"><img src="/images/icons/double-down.svg" alt="Expand rating section"></button>
            </div>
            <div id="rating-details" class="hidden">
                <table>
        `
        
        scoresList.forEach(function (score){
            ratingElement += `
                    <tr>
                        <th>${score[0]}:</th>
                        <td>${score[1]}/5</td>
                    </tr>
            `    
        });
       
        ratingElement += `
                </table>
            </div>
          `
        
        return ratingElement;
    }

    renderBreed(breed, rating){
        renderBreedWithTemplate(this.breedDetailTemplate, this.detailElement, breed);
        if (rating)
            renderBreedWithTemplate(this.breedRatingTemplate, this.ratingElement, rating);
    }
}