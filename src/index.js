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

//Prints a single recipe
function printRecipe(recipeObject) {
  let results = document.querySelector("#showResponse");
  // create a new div with class recipe card
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
  recipeLink.setAttribute('target','_blank');
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
  //favorites
  document.querySelector('#shoppingInput').value = null;
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

//favorites
function addShoppingIngredient() {
  let newShoppingIngredient = document.querySelector('#shoppingInput').value;
  let currentShoppingInventory = JSON.parse(sessionStorage.getItem('inventory2'));
  if (!currentShoppingInventory.includes(newShoppingIngredient) && newShoppingIngredient!=='') {
    currentShoppingInventory.push(newShoppingIngredient);
    sessionStorage.setItem('inventory2', JSON.stringify(currentShoppingInventory));
  }
  refreshShoppingList();
  document.querySelector('#shoppingInput').value = null;
}

//Updates the ul of the inventory
function refreshShoppingList() {
let ul = document.getElementById('shoppingList');
//Clear list
ul.innerHTML = '';
//gets sessionStorage inventory
let inventory2 = JSON.parse(sessionStorage.getItem('inventory2'));
//generates list items for each item in the Inventory including a delete button for each ingredient
inventory2.forEach(element => {
  let ingredients = document.createElement('li');
  ingredients.append(element);
  let deleteButton2 = document.createElement('button');
  deleteButton2.type = 'button';
  deleteButton2.innerHTML = 'X';
  //Creates delete button, which, if clicked, removes the item from the list and the sessionStorage
  deleteButton2.addEventListener("click", function () {
    ingredients.remove();
    let currentInventory2 = JSON.parse(sessionStorage.getItem('inventory2'));
    currentInventory2 = currentInventory2.filter(item => item !== element);
    sessionStorage.setItem('inventory2', JSON.stringify(currentInventory2));
  });
  ingredients.append(deleteButton2);
  ul.append(ingredients);
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
  //favorites
  document.querySelector('#shoppingInput').addEventListener('submit', handleForm);
  document.getElementById('submitInput').addEventListener('click', addShoppingIngredient);
  let inventory2 = [];
  sessionStorage.setItem('inventory2', JSON.stringify(inventory2));
  printAllRecipes(defaultRecipes);
  runMenuButton();
});