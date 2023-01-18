// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js'

//Business Logic

async function getRecipes(newUrl) {
  const response = await RecipeFinder.getRecipes(newUrl);
  if (response.hits) {
    console.log("success!")
    printRecipes(response);
  } else {
    printError(response);
  }
}

function getURL (food, mealType, healthType){
  let url;
  if (mealType.length === 0 && healthType.length === 0){
     url = (`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=${process.env.API_KEY}&random=true`);
  }else if(mealType.length > 0 && healthType.length === 0){
    url = (`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=${process.env.API_KEY}&mealType=${mealType}&random=true`);
  }else if (mealType.length === 0 && healthType.length > 0){
    url = (`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=${process.env.API_KEY}&health=${healthType}&random=true`);
  }else if (mealType.length > 0 && healthType.length > 0){
    url = (`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=${process.env.API_KEY}&mealType=${mealType}&health=${healthType}&random=true`);
  }
  return url
}

function printRecipes(response){
  let results = document.querySelector("#showResponse");
  response.hits.forEach(element=> {
    let imgTag= document.createElement("img");
    imgTag.setAttribute("src", element.recipe.images.SMALL.url);
    results.append(imgTag);
    let list= document.createElement("li");
    list.append(element.recipe.label);
    results.append(list);
    
  })

}

function printError() {
  console.log("print Error");
}

function handleForm(event){
  event.preventDefault();
  console.log("running");
  document.querySelector("#showResponse").innerText = null;
  const food = document.querySelector('#ingredientInput').value;
  const mealType = document.querySelector('#mealSelection').value;
  console.log(mealType);
  getRecipes(food, mealType);
  const healthType = document.querySelector('#healthSelection').value;
  const newUrl = getURL(food, mealType, healthType)
  getRecipes(newUrl);
}

window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);

});