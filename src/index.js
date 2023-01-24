import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './services/recipes.js';
import { defaultRecipes, favoriteRecipes } from './services/default_recipes.js';

//Business Logic

//Returns an array of recipe objects from the API call
async function getRecipes() {
  const response = await RecipeFinder.getRecipes();
  if (response.hits) {
    //Array of recipe objects from API call
    return response.hits;
  } else {
    printError(response);
  }
}

//Prints each element in an array of recipe objects
function printAllRecipes(recipesListObject) {
  recipesListObject.forEach(element => {
    printRecipe(element);
  });
}

//UI Logic

function printRecipe(recipeObject) {
  let results = document.querySelector("#showResponse");
  let divTag= document.createElement("div");
  divTag.setAttribute("class", "card");
  //Creates clickable image
  let imgTag = document.createElement("img");
  imgTag.setAttribute("src", recipeObject.recipe.image);
  imgTag.setAttribute("class", 'recipeImg');
  imgTag.onclick = function () {
    window.open(`${recipeObject.recipe.url}`);
  };
  divTag.append(imgTag);
  //Creates Link
  let pTag = document.createElement("p");
  let recipeLink = document.createElement('a');
  recipeLink.setAttribute('href', recipeObject.recipe.url);
  recipeLink.setAttribute('target','_blank');
  recipeLink.innerHTML = recipeObject.recipe.label;
  pTag.append(recipeLink);
  divTag.append(pTag);
  results.append(divTag);
  
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

//Adds Ingredient from the input form to the session storage inventory
function addIngredient() {
  let newIngredient = document.querySelector('#ingredientInput').value;
  let currentInventory = JSON.parse(sessionStorage.getItem('inventory'));
  if (!currentInventory.includes(newIngredient) && newIngredient!=='') {
    currentInventory.push(newIngredient);
    sessionStorage.setItem('inventory', JSON.stringify(currentInventory));
  }
  refreshInventoryList();
  document.querySelector('#ingredientInput').value = null;
}

//Updates the ul of the inventory
function refreshInventoryList() {
  let ul = document.getElementById('listOfIngredients');
  //Clear list
  ul.innerHTML = '';
  //gets sessionStorage inventory
  let inventory = JSON.parse(sessionStorage.getItem('inventory'));
  //generates list items for each item in the Inventory including a delete button for each ingredient
  inventory.forEach(element => {
    let ingredient = document.createElement('li');
    ingredient.append(element);
    let deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.innerHTML = 'X';
    //Creates delete button, which, if clicked, removes the item from the list and the sessionStorage
    deleteButton.addEventListener("click", function () {
      ingredient.remove();
      let currentInventory = JSON.parse(sessionStorage.getItem('inventory'));
      currentInventory = currentInventory.filter(item => item !== element);
      sessionStorage.setItem('inventory', JSON.stringify(currentInventory));
    });
    ingredient.append(deleteButton);
    ul.append(ingredient);
  });
}


const runMenuButton = () => {
  const menuButton = document.getElementsByClassName('menubutton')[0];
  const navLinks = document.getElementsByClassName('navlinks')[0];
  menuButton.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });
}

window.addEventListener('load', function () {
  document.querySelector('#inputForm').addEventListener('submit', handleForm);
  document.getElementById('addIngredientButton').addEventListener('click', addIngredient);
  let inventory = [];
  sessionStorage.setItem('inventory', JSON.stringify(inventory));
  printAllRecipes(defaultRecipes);
  runMenuButton();
});