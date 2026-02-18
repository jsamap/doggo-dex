const urlDogApi = import.meta.env.VITE_API_URL_DOGAPI;
const urlTheDogApi = import.meta.env.VITE_API_URL_THEDOGAPI;
const urlApiNinja = import.meta.env.VITE_API_URL_APININJA;

const theDogApiKey = import.meta.env.VITE_API_KEY_THEDOGAPI;
const apiNinjaApiKey = import.meta.env.VITE_API_KEY_APININJA;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {name: "serviceError", message: jsonResponse};
  }
}

export class DogApiService {
  constructor() {  }
  
  async getRandomFact() {
    const response = await fetch(`${urlDogApi}facts?limit=1`);
    const data = await convertToJson(response);
    return data.data[0].attributes.body;
  }
}

export class TheDogApiService {
  constructor() {  }

  async getRandomPicture() {
    const response = await fetch(`${urlTheDogApi}images/search?limit=1`);
    const data = await convertToJson(response);
    return data[0].url;
  }
  
  async getAllBreeds () {
    const response = await fetch(`${urlTheDogApi}breeds`, {
      method: "GET",
      headers: {
        "x-api-key": theDogApiKey,
        "Content-Type": "application/json"
      }
    });
    const data = await convertToJson(response);
    return data;
  }
  async getBreedById (breed_id) {
    const response = await fetch(`${urlTheDogApi}breeds/${breed_id}`, {
      method: "GET",
      headers: {
        "x-api-key": theDogApiKey,
        "Content-Type": "application/json"
      }
    });
    const data = await convertToJson(response);
    return data;
  }

}

export class ApiNinjaService {
  constructor() {  }
  
  async getBreedByName (breed_name) {
    const response = await fetch(`${urlApiNinja}dogs?name=${breed_name}`, {
      method: "GET",
      headers: {
        "x-api-key": apiNinjaApiKey,
        "Content-Type": "application/json"
      }
    });
    const data = await convertToJson(response);
    return data[0];
  }

}