import{r as p,a as g,i as v,b as c,d as b,c as f,e as o,f as m,l as w,g as D,s as L}from"./utils-BsHpiXy2.js";import{T as B,A as $}from"./ExternalServices-zFhFygl3.js";class y{constructor(t,s){this.dataSource=t,this.selectElement=s}async init(){const t=await this.dataSource.getAllBreeds();this.renderOptions(t)}breedOptionTemplate(t){return`<option value="${t.id}|${t.name}">${t.name}</option>`}renderOptions(t){p(this.breedOptionTemplate,this.selectElement,t,"afterbegin",!1)}}class E{constructor(t,s,e,i,n){this.breed_id=t,this.detailDataSource=s,this.detailElement=e,this.ratingDataSource=i,this.ratingElement=n,this.breedDetail={}}async init(){this.breedDetail=await this.detailDataSource.getBreedById(this.breed_id);const t=await this.ratingDataSource.getBreedByName(this.breedDetail.name);console.log(this.breedDetail),console.log(t),this.renderBreed(this.breedDetail,t),document.getElementById("addFavorite").addEventListener("click",this.addFavorite.bind(this));const e=document.getElementById("button-expand"),i=document.getElementById("rating-details");e.addEventListener("click",()=>{e.classList.toggle("rotated"),console.log(i),i.classList.toggle("hidden"),i.classList.toggle("rating-details")})}addFavorite(){const t=g("dd-favorites")||[],s=t.findIndex(i=>i.id===this.breedDetail.id);let e=document.getElementById("addFavorite");s===-1?(t.push(this.breedDetail),e.classList.remove("text-white"),e.classList.add("text-red"),e.classList.add("glow-red"),e.addEventListener("animationend",()=>{e.classList.remove("glow-red")},{once:!0}),v(),c()):(t.splice(s,1),e.classList.remove("text-red"),e.classList.add("text-white"),b(),c()),f("dd-favorites",t)}breedDetailTemplate(t){const e=(g("dd-favorites")||[]).findIndex(i=>i.id===t.id);return`
            <div class="profile-picture">
                <img src="${t.image.url}" alt="${t.name}">
                
                <div class="button-container">
                    <button class="${e>-1?"text-red":"text-white"}" id="addFavorite">FAVORITE ❤️</button>
                </div>
            </div>
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
          `}breedRatingTemplate(t){const s=[["Good with children",t.good_with_children],["Good with dogs",t.good_with_other_dogs],["Good with strangers",t.good_with_strangers],["Shedding",o(t.shedding)],["Grooming",o(t.grooming)],["Drooling",o(t.drooling)],["Playfulness",t.playfulness],["Protectiveness",t.protectiveness],["Trainability",t.trainability],["Energy",t.energy],["Loudness",o(t.barking)]],e=parseFloat((s.reduce((a,[,d])=>a+d,0)/s.length).toFixed(1));let i=`
           <div class="overall-rating">
                <h3>Overall Rating: ${e}</h3>
                <hr>
                <div id="breed-rating">
        `;const n=Math.trunc(e),l=(e-n).toFixed(1);for(let a=1;a<=n;a++)i+=`
                    <img src="/images/icons/star-gold.svg" alt="star" class="star">
        `;return l>0&&(i+=`
                    <img src="/images/icons/star-gold.svg" alt="star" class="star half-star" style="--percent:${l}" >
        `),i+=`
                </div>
                <hr>
                <button id="button-expand"><img src="/images/icons/double-down.svg" alt="Expand rating section"></button>
            </div>
            <div id="rating-details" class="hidden">
                <table>
        `,s.forEach(function(a){i+=`
                    <tr>
                        <th>${a[0]}:</th>
                        <td>${a[1]}/5</td>
                    </tr>
            `}),i+=`
                </table>
            </div>
          `,i}renderBreed(t,s){m(this.breedDetailTemplate,this.detailElement,t),s&&m(this.breedRatingTemplate,this.ratingElement,s)}}async function S(){await w(),D(),L(),c();let r=new B;const t=document.querySelector("#breed-select"),s=document.querySelector("#breed-details");new y(r,t).init();let i=new $;const n=document.querySelector("#breed-rating");n.innerHTML="",document.getElementById("breed-select").addEventListener("change",a=>{const d=a.target.value;console.log("Selected option:",d);const[h,u]=d.split("|");console.log(`id: '${h}'; name: '${u}'`),n.innerHTML="",new E(h,r,s,i,n).init()})}S();
