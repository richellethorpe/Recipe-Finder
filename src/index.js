// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js';

//Business Logic

async function getRecipes(food, mealType) {
  const response = await RecipeFinder.getRecipes(food, mealType);
  if (response.hits) {
    printRecipes(response);
  } else {
    printError(response);
  }
}

function printRecipes(response) {
  let results = document.querySelector("#showResponse");
  response.hits.forEach(element => {
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", element.recipe.images.SMALL.url);
    imgTag.setAttribute("class", 'recipeImg');
    imgTag.onclick = function () {
      window.location.href = `${element.recipe.url}`;
    };
    results.append(imgTag);
    let list = document.createElement("li");
    let recipeLink = document.createElement('a');
    recipeLink.setAttribute('href', element.recipe.url);
    recipeLink.innerHTML = element.recipe.label;
    list.append(recipeLink);
    results.append(list);
  });

}

function printError(errorMessage) {
  let results = document.querySelector("#showResponse");
  results.append(errorMessage);
}

function handleForm(event) {
  event.preventDefault();
  document.querySelector("#showResponse").innerText = null;
  const food = document.querySelector('#ingredientInput').value;
  document.querySelector('#ingredientInput').value = null;
  const mealType = document.querySelector('#mealSelection').value;
  getRecipes(food, mealType);
}

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', handleForm);

});