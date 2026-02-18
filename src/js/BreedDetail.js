import { renderBreedWithTemplate, invertRatingScore } from "./utils.mjs";

export default class BreedDetail {
    constructor (breed_id, detailDataSource, detailElement, ratingDataSource, ratingElement){
        this.breed_id = breed_id;
        this.detailDataSource = detailDataSource;
        this.detailElement = detailElement;
        this.ratingDataSource = ratingDataSource;
        this.ratingElement = ratingElement;
    }
    
    async init(){
        console.log("INIT START")
        console.log(this.detailDataSource)
        const breedData = await this.detailDataSource.getBreedById(this.breed_id);
        const ratingData = await this.ratingDataSource.getBreedByName(breedData.name);
        
        console.log("INIT MID");
        console.log(breedData);
        console.log(ratingData);
        this.renderBreed(breedData, ratingData);
        
        console.log("INIT END")
    }

    breedDetailTemplate(breed){
        return (
          `
            <img src="${breed.image.url}" alt="${breed.name}">
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
            <div class="button-container">
                <button>FAVORITE ❤️</button>
            </div>
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
           <div>
                <h3>Overall Rating: ${average}</h3>
                <hr>
                <div id="breed-rating">
        `
        
        const whole = Math.trunc(average);
        const decimal = (average-whole).toFixed(1);

        for (let i = 1; i <= whole; i++) {
            console.log("Iteration:", i);
            ratingElement += 
        `
                    <img src="/images/icons/star-gold.svg" alt="star" class="star">
        `
        }
        if (decimal>0) {
            console.log("Decimal:", decimal)
            ratingElement += 
        `
                    <img src="/images/icons/star-gold.svg" alt="star" class="star half-star" style="--percent:${decimal}" >
        `   
        }

                     
        ratingElement += 
        `
                </div>
                <hr>
                <button><img src="/images/icons/double-down.svg" alt="Expand rating section"></button>
            </div>
            <div>
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