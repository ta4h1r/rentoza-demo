import axios from "axios";

const client = axios.create({ baseURL: process.env.SERVER_URL || "http://localhost:8005/api" });
const cocktailsClient = axios.create({
  baseURL: "https://thecocktaildb.com/api/json/v1/1/search.php",
});

export async function loadPatrons() {
  return await client.get("/patrons");
}

export async function getPatron(id) {
  return await client.get("/patrons/" + id);
}

export async function addPatron(data) {
  return await client.post("/patrons", data);
}

export async function editPatron(id, data) {
  return await client.put("/patrons/" + id, data);
}

export async function removePatron(patron) {
  const id = patron._id;
  return await client.delete("/patrons/" + id);
}

export async function loadAllDrinks() {
  let drinks;
  if (localStorage.getItem("ALL_DRINKS")) {
    drinks = JSON.parse(localStorage.getItem("ALL_DRINKS"));
  } else {
    const responses = [];
    for (let i = 65; i < 65 + 26; i++) {
      await delay(50);
      responses.push(cocktailsClient.get(`?f=${String.fromCharCode(i)}`));
    }
    drinks = (await Promise.all(responses))
      .reduce((acc, curr) => {
        return [...acc, curr.data.drinks];
      }, [])
      .flat();
    localStorage.setItem("ALL_DRINKS", JSON.stringify(drinks));
  }
  return drinks;
}

export async function getPatronSaturation(id) {
  if(id) return await client.get("/patrons/" + id + "/saturation");
}

async function delay(delayMillis) {
  return new Promise((resolve) => {
    setTimeout(resolve(), delayMillis);
  });
}
