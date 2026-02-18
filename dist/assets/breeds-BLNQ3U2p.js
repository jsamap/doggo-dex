import{r as m,i as d,a as h,l as p,g as u,s as v}from"./utils-Dks62tlx.js";import{T as b,A as $}from"./ExternalServices-zFhFygl3.js";class D{constructor(t,e){this.dataSource=t,this.selectElement=e}async init(){const t=await this.dataSource.getAllBreeds();this.renderOptions(t)}breedOptionTemplate(t){return`<option value="${t.id}|${t.name}">${t.name}</option>`}renderOptions(t){m(this.breedOptionTemplate,this.selectElement,t,"afterbegin",!1)}}class T{constructor(t,e,a,i,n){this.breed_id=t,this.detailDataSource=e,this.detailElement=a,this.ratingDataSource=i,this.ratingElement=n}async init(){console.log("INIT START"),console.log(this.detailDataSource);const t=await this.detailDataSource.getBreedById(this.breed_id),e=await this.ratingDataSource.getBreedByName(t.name);console.log("INIT MID"),console.log(t),console.log(e),this.renderBreed(t,e),console.log("INIT END")}breedDetailTemplate(t){return`
            <img src="${t.image.url}" alt="${t.name}">
            <table>
                <tr>
                    <th>Breed:</th>
                    <td>${t.name}</td>
                </tr>
                <tr>
                    <th>Life span:</th>
                    <td>${t.life_span} years</td>
                </tr>
                <tr>
                    <th>Temperament:</th>
                    <td>${t.temperament}</td>
                </tr>
                <tr>
                    <th>Origin:</th>
                    <td>${t.origin}</td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td>${t.description}</td>
                </tr>
                <tr>
                    <th>Weight:</th>
                    <td><p>${t.weight.metric.split(";")[0]} kg</p><p>${t.weight.metric.split(";")[1]} kg</p></td>
                </tr>
                <tr>
                    <th>Height:</th>
                    <td><p>${t.height.metric.split(";")[0]} cm</p><p>${t.height.metric.split(";")[1]} cm</p></td>
                </tr>
                <tr>
                    <th>Breed Group:</th>
                    <td>${t.breed_group}</td>
                </tr>
            </table>
            <div class="button-container">
                <button>FAVORITE ❤️</button>
            </div>
          `}breedRatingTemplate(t){const e=[["Good with children",t.good_with_children],["Good with dogs",t.good_with_other_dogs],["Good with strangers",t.good_with_strangers],["Shedding",d(t.shedding)],["Grooming",d(t.grooming)],["Drooling",d(t.drooling)],["Playfulness",t.playfulness],["Protectiveness",t.protectiveness],["Trainability",t.trainability],["Energy",t.energy],["Loudness",d(t.barking)]],a=parseFloat((e.reduce((r,[,l])=>r+l,0)/e.length).toFixed(1));let i=`
           <div>
                <h3>Overall Rating: ${a}</h3>
                <hr>
                <div id="breed-rating">
        `;const n=Math.trunc(a),s=(a-n).toFixed(1);for(let r=1;r<=n;r++)console.log("Iteration:",r),i+=`
                    <img src="/images/icons/star-gold.svg" alt="star" class="star">
        `;return s>0&&(console.log("Decimal:",s),i+=`
                    <img src="/images/icons/star-gold.svg" alt="star" class="star half-star" style="--percent:${s}" >
        `),i+=`
                </div>
                <hr>
                <button><img src="/images/icons/double-down.svg" alt="Expand rating section"></button>
            </div>
            <div>
                <table>
        `,e.forEach(function(r){i+=`
                    <tr>
                        <th>${r[0]}:</th>
                        <td>${r[1]}/5</td>
                    </tr>
            `}),i+=`
                </table>
            </div>
          `,i}renderBreed(t,e){h(this.breedDetailTemplate,this.detailElement,t),e&&h(this.breedRatingTemplate,this.ratingElement,e)}}async function S(){await p(),u(),v();let o=new b;const t=document.querySelector("#breed-select"),e=document.querySelector("#breed-details");new D(o,t).init();let i=new $;const n=document.querySelector("#breed-rating");n.innerHTML="",document.getElementById("breed-select").addEventListener("change",r=>{const l=r.target.value;console.log("Selected option:",l);const[c,g]=l.split("|");console.log(`id: '${c}'; name: '${g}'`),n.innerHTML="",new T(c,o,e,i,n).init()})}S();
