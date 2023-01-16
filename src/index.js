// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js'
// import Search from '.search-obj.js'

//Business Logic

function Search() {
  this.ingredients; // = document.querySelector('#ingredientInput').value;
  this.mealType; // = document.querySelector('mealSelection').value;
  this.health; // = document.querySelector('health').value;
  this.cookTime; // = document.querySelector('#cookTime').value;
  this.excluded; // = document.querySelector('#excluded').value; 
}

async function getRecipes(recipeParams) {
  const response = await RecipeFinder.getRecipes(recipeParams);
  if (response.ok) {
    printRecipes(response);
  } else {
    printError(response);
  }
}
function printRecipes(){
  console.log("print Recipes")
}

function printError() {
  console.log("print Error");
}

function handleForm(event){
  event.preventDefault();
  let recipeParams = new Search();
  recipeParams.ingredients = document.querySelector('#ingredientInput').value;
  recipeParams.mealType = document.querySelector('#mealSelection').value;
  recipeParams.health = document.querySelector('#health').value;
  recipeParams.cookTime = document.querySelector('#cookTime').value;
  recipeParams.excluded = document.querySelector('#excluded').value;
  //document.querySelector('#ingredientInput').value = null;
  getRecipes(recipeParams);
  console.log("search object", recipeParams);
}

window.addEventListener('load', function() {
  console.log("running");
  document.querySelector('form').addEventListener('submit', handleForm);

});