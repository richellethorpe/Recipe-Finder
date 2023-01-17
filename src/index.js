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
}

window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', handleForm);

});