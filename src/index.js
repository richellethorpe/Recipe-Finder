// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js'
import Search from '.search-obj.js'

//Business Logic

async function getRecipes(recipeParams) {
  const response = await RecipeFinder.getRecipes(food, mealType);
  if (response.status) {
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
  const food = document.querySelector('#ingredientInput').value;
  console.log(food);
  document.querySelector('#ingredientInput').value = null;
  const mealType = document.querySelector('mealSelection').value;
  getRecipes(recipeParams);
  console.log("submitted");
}

window.addEventListener('load', function() {
  console.log("running");
  document.querySelector('form').addEventListener('submit', handleForm);

});