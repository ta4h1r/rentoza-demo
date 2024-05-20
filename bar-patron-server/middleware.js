Table = require("./inputModel");

module.exports = middleware = async function (req, res, next) {
  // Update all drinks that do not have an ABV value
  switch (req.method) {
    case "PUT":
    case "POST":
      const drinks = req.body.drinks;

      for (let i = 0; i < drinks.length; i++) {
        const drinkId = drinks[i].drink.id;
        drinks[i].drink["mlsAlcohol"] = await getMlsAlcohol(drinkId);
      }

      req.body.drinks = drinks

      break;
    default:
      break;
  }
  next();
};

async function getMlsAlcohol(drinkId) {
  const drinkDetails = await (await fetch(
    "http://thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId
  ) ) .json();
//   console.log(drinkDetails.drinks[0])


// Get ingredients 
let keys = Object.keys(drinkDetails.drinks[0]); 
let values = Object.values(drinkDetails.drinks[0]); 
const firstIngredientIndex = keys.findIndex(it => it.includes("Ingredient"))

const ingredients = []
for(let i = firstIngredientIndex; i < firstIngredientIndex + 15; i ++) {
    if(values[i]) ingredients.push(values[i])
}

const ingredientAbvs = [];
for(let i = 0; i < ingredients.length; i++) {
    const r = await (await fetch(
        "http://thecocktaildb.com/api/json/v1/1/search.php?i=" + ingredients[i]
      )).json(); 

      ingredientAbvs.push(r.ingredients[0]?.strABV ?? 0)
}



// Get measures 
keys = Object.keys(drinkDetails.drinks[0]); 
values = Object.values(drinkDetails.drinks[0]); 
const firstMeasureIndex = keys.findIndex(it => it.includes("Measure"))

const measures = []
for(let i = firstMeasureIndex; i < firstMeasureIndex + 15; i ++) {
    if(values[i]) measures.push(values[i])
}


for(let i = 0; i < measures.length; i ++) {
    const measure = measures[i]; 
    measures[i] = measure.split(" ").filter(it => {
        try{
            return eval(it)
        } catch (e) {
            return
        }
    })
}

const measuresMl = measures.flat().map(it => Number(it) * 30)
const mls = []; 
for(let i = 0; i < ingredientAbvs.length; i++) {
    const mlsAlcoholForDrink = measuresMl[i] * ingredientAbvs[i]/100;
    if(!isNaN(mlsAlcoholForDrink)) {
       mls.push(mlsAlcoholForDrink) 
    }
}

const totalMls = mls.reduce((acc, curr) => acc + curr, 0)

return totalMls;
}
