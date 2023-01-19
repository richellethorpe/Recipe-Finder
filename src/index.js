// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './recipes.js';



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
  let results = document.querySelector("#showResponse");
  response.hits.forEach(element => {
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", element.recipe.images.SMALL.url);
    imgTag.setAttribute("class", 'recipeImg');
    // imgTag.setAttribute('target', '_blank');
    imgTag.onclick = function () {
      window.location.href = (`${element.recipe.url}`);
    };
    results.append(imgTag);
    let list = document.createElement("li");
    let recipeLink = document.createElement('a');
    recipeLink.setAttribute('href', element.recipe.url,);
    recipeLink.setAttribute('target', '_blank');
    recipeLink.innerHTML = element.recipe.label;
    list.append(recipeLink);
    results.append(list);
    
  })

}

function printError(errorMessage) {
  let results = document.querySelector("#showResponse");
  results.append(errorMessage);
}

function handleForm(event) {
  event.preventDefault();
  document.querySelector("#showResponse").innerText=null;
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

window.addEventListener('load', function () {
  document.querySelector('form').addEventListener('submit', handleForm);

});