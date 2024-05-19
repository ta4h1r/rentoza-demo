import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:8005/api" });
const cocktailsClient = axios.create({
  baseURL: "https://thecocktaildb.com/api/json/v1/1/search.php",
});

export async function loadPatrons() {
  client.get("/");
}

export async function addPatron(id) {}

export async function removePatron(id) {}

export async function addDrinkToPatronTally(id, drink) {}

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

async function delay(delayMillis) {
  return new Promise((resolve) => {
    setTimeout(resolve(), delayMillis);
  });
}
