import{r as p,a as g,i as v,b as c,d as b,c as f,e as o,f as m,l as w,g as D,s as $}from"./utils-DM9Wm1Jm.js";import{T as y,A as B}from"./ExternalServices-zFhFygl3.js";class L{constructor(t,e){this.dataSource=t,this.selectElement=e}async init(){const t=await this.dataSource.getAllBreeds();this.renderOptions(t)}breedOptionTemplate(t){return`<option value="${t.id}|${t.name}">${t.name}</option>`}renderOptions(t){p(this.breedOptionTemplate,this.selectElement,t,"afterbegin",!1)}}class S{constructor(t,e,i,s,r){this.breed_id=t,this.detailDataSource=e,this.detailElement=i,this.ratingDataSource=s,this.ratingElement=r,this.breedDetail={}}async init(){this.breedDetail=await this.detailDataSource.getBreedById(this.breed_id);const t=await this.ratingDataSource.getBreedByName(this.breedDetail.name);console.log(this.breedDetail),console.log(t),this.renderBreed(this.breedDetail,t),document.getElementById("addFavorite").addEventListener("click",this.addFavorite.bind(this))}addFavorite(){const t=g("dd-favorites")||[],e=t.findIndex(s=>s.id===this.breedDetail.id);let i=document.getElementById("addFavorite");e===-1?(t.push(this.breedDetail),i.classList.remove("text-white"),i.classList.add("text-red"),i.classList.add("glow-red"),i.addEventListener("animationend",()=>{i.classList.remove("glow-red")},{once:!0}),v(),c()):(t.splice(e,1),i.classList.remove("text-red"),i.classList.add("text-white"),b(),c()),f("dd-favorites",t)}breedDetailTemplate(t){const i=(g("dd-favorites")||[]).findIndex(s=>s.id===t.id);return`
            <div class="profile-picture">
                <img src="${t.image.url}" alt="${t.name}">
                
                <div class="button-container">
                    <button class="${i>-1?"text-red":"text-white"}" id="addFavorite">FAVORITE ❤️</button>
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
          `}breedRatingTemplate(t){const e=[["Good with children",t.good_with_children],["Good with dogs",t.good_with_other_dogs],["Good with strangers",t.good_with_strangers],["Shedding",o(t.shedding)],["Grooming",o(t.grooming)],["Drooling",o(t.drooling)],["Playfulness",t.playfulness],["Protectiveness",t.protectiveness],["Trainability",t.trainability],["Energy",t.energy],["Loudness",o(t.barking)]],i=parseFloat((e.reduce((a,[,d])=>a+d,0)/e.length).toFixed(1));let s=`
           <div>
                <h3>Overall Rating: ${i}</h3>
                <hr>
                <div id="breed-rating">
        `;const r=Math.trunc(i),l=(i-r).toFixed(1);for(let a=1;a<=r;a++)s+=`
                    <img src="/images/icons/star-gold.svg" alt="star" class="star">
        `;return l>0&&(s+=`
                    <img src="/images/icons/star-gold.svg" alt="star" class="star half-star" style="--percent:${l}" >
        `),s+=`
                </div>
                <hr>
                <button><img src="/images/icons/double-down.svg" alt="Expand rating section"></button>
            </div>
            <div>
                <table>
        `,e.forEach(function(a){s+=`
                    <tr>
                        <th>${a[0]}:</th>
                        <td>${a[1]}/5</td>
                    </tr>
            `}),s+=`
                </table>
            </div>
          `,s}renderBreed(t,e){m(this.breedDetailTemplate,this.detailElement,t),e&&m(this.breedRatingTemplate,this.ratingElement,e)}}async function E(){await w(),D(),$(),c();let n=new y;const t=document.querySelector("#breed-select"),e=document.querySelector("#breed-details");new L(n,t).init();let s=new B;const r=document.querySelector("#breed-rating");r.innerHTML="",document.getElementById("breed-select").addEventListener("change",a=>{const d=a.target.value;console.log("Selected option:",d);const[h,u]=d.split("|");console.log(`id: '${h}'; name: '${u}'`),r.innerHTML="",new S(h,n,e,s,r).init()})}E();
