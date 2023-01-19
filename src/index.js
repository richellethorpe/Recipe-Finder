// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './services/recipes.js';
import { defaultRecipes, favoriteRecipes } from './services/default_recipes.js';

//Returns an array of recipe objects
async function getRecipes() {
  const response = await RecipeFinder.getRecipes();
  if (response.hits) {
    //Array of recipe objects from API call
    return response.hits;
  } else {
    printError(response);
  }
}

//From an array of recipes objects, prints all of them
function printAllRecipes(recipesListObject) {
  recipesListObject.forEach(element => {
    printRecipe(element);
  });
}

//Prints a single recipe
function printRecipe(recipeObject) {
  let results = document.querySelector("#showResponse");
  //Creates clickable image
  let imgTag = document.createElement("img");
  imgTag.setAttribute("src", recipeObject.recipe.image);
  imgTag.setAttribute("class", 'recipeImg');
  imgTag.onclick = function () {
    window.open(`${recipeObject.recipe.url}`);
  };
  results.append(imgTag);
  //Creates Link
  let list = document.createElement("li");
  let recipeLink = document.createElement('a');
  recipeLink.setAttribute('href', recipeObject.recipe.url);
  recipeLink.innerHTML = recipeObject.recipe.label;
  list.append(recipeLink);
  results.append(list);
}

function printError(errorMessage) {
  let results = document.querySelector("#showResponse");
  results.append(errorMessage);
}

async function handleForm(event) {
  event.preventDefault();
  let recipeObjectsList = await getRecipes();
  document.querySelector("#showResponse").innerText = null;
  document.querySelector('#ingredientInput').value = null;
  printAllRecipes(recipeObjectsList);
}

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', handleForm);
  console.log(defaultRecipes);
  console.log(favoriteRecipes);
  printAllRecipes(defaultRecipes);
  printAllRecipes(favoriteRecipes);
});