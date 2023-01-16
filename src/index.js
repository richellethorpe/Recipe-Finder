// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js'

//Business Logic

async function getRecipes(food, mealType) {
  const response = await RecipeFinder.getRecipes(food, mealType);
  if (response.hits) {
    printRecipes(response);
  } else {
    printError(response);
  }
}
function printRecipes(response){
  console.log("print Recipes")
  response.hits.forEach(element=> {
    let list= document.createElement("li");
    document.querySelector("#showResponse").append(list);
    list.append(element.recipe.label);
  })
  
}

function printError() {
  console.log("print Error");
}

function handleForm(event){
  event.preventDefault();
  document.querySelector("#showResponse").innerText = null;
  const food = document.querySelector('#ingredientInput').value;
  document.querySelector('#ingredientInput').value = null;
  const mealType = document.querySelector('#mealSelection').value;
  getRecipes(food, mealType);
}

window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);

});