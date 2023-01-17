// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js'

//Business Logic

async function getRecipes(url) {
  const response = await RecipeFinder.getRecipes(url);
  if (response.hits) {
    printRecipes(response);
  } else {
    printError(response);
  }
}

function getURL (food, mealType){
  let url;
  if (mealType.length === 0){
     url = (`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=${process.env.API_KEY}&random=true`);
  }else {
    url = (`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=${process.env.API_KEY}&mealType=${mealType}&random=true`);
  }
  return url;
}

function printRecipes(response){
  let results = document.querySelector("#showResponse");
  response.hits.forEach(element=> {
    let imgTag= document.createElement("img");
    imgTag.setAttribute("src", element.recipe.images.REGULAR.url);
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
  document.querySelector('#ingredientInput').value = null;
  const mealType = document.querySelector('#mealSelection').value;
  console.log(mealType);
  getRecipes(food, mealType);
  const newUrl = getURL(food, mealType)
  getRecipes(newUrl);
}

window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);

});