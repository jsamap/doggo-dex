const urlDogApi = import.meta.env.VITE_API_URL_DOGAPI;
const urlTheDogApi = import.meta.env.VITE_API_URL_THEDOGAPI;


async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {name: "serviceError", message: jsonResponse};
  }
}

export default class ExternalServices {
  constructor() {  }
  
  async getRandomFact() {
    const response = await fetch(`${urlDogApi}facts?limit=1`);
    const data = await convertToJson(response);
    return data.data[0].attributes.body;
  }
  async getRandomPicture() {
    const response = await fetch(`${urlTheDogApi}images/search?limit=1`);
    const data = await convertToJson(response);
    return data[0].url;
  }
}