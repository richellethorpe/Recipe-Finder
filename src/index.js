// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js'
// import Search from '.search-obj.js'

//Business Logic

function Search() {
  this.ingredients;
  this.mealType;
  this.health;
  this.cookTime;
  this.excluded; 
}

async function getRecipes(searchObject) {
  const response = await RecipeFinder.getRecipes(searchObject);
  if (response.hits) {
    printRecipes(response);
  } else {
    printError(response);
  }
}
function printRecipes(response){
  console.log("print Recipes")
  let results = document.querySelector('#showResponse');
  response.hits.forEach(element => {
    let newRecipeImg = document.createElement('img');
    newRecipeImg.setAttribute('src', element.recipe.images.SMALL.url);
    results.append(newRecipeImg);
  });
}

function printError() {
  console.log("print Error");
}

function handleForm(event){
  event.preventDefault();
  let searchObject = new Search();
  searchObject.ingredients = document.querySelector('#ingredientInput').value;
  searchObject.mealType = document.querySelector('#mealSelection').value;
  searchObject.health = document.querySelector('#health').value;
  searchObject.cookTime = document.querySelector('#cookTime').value;
  searchObject.excluded = document.querySelector('#excluded').value;
  document.querySelector('#ingredientInput').value = null;
  getRecipes(searchObject);
  console.log("search object", searchObject);
}

window.addEventListener('load', function() {
  console.log("running");
  document.querySelector('form').addEventListener('submit', handleForm);

});