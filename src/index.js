import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import RecipeFinder from './services/recipes.js';
import { defaultRecipes } from './services/default_recipes.js';

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
  let divTag = document.createElement("div");
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
  recipeLink.setAttribute('target', '_blank');
  recipeLink.innerHTML = recipeObject.recipe.label;
  pTag.append(recipeLink);
  divTag.append(pTag);
  results.append(divTag);


  //Creates Favorite Button
  if (window.location.pathname !== '/favorites.html') {
    let favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.innerHTML = 'Add to Favorites';
    favoriteButton.onclick = function () {
      let currentFavorites = JSON.parse(sessionStorage.getItem('favorites'));
      if (!currentFavorites.some(e => e.recipe.label === recipeObject.recipe.label)) {
        currentFavorites.push(recipeObject);
        sessionStorage.setItem('favorites', JSON.stringify(currentFavorites));
        favoriteButton.remove();
      }
    };
    divTag.append(favoriteButton);
    results.append(divTag);
  }
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
  printAllRecipes(recipeObjectsList);
}

//Adds Ingredient from the input form to the session storage inventory
function addIngredient() {
  let newIngredient = document.querySelector('#ingredientInput').value;
  let currentInventory = JSON.parse(sessionStorage.getItem('inventory'));
  if (!currentInventory.includes(newIngredient) && newIngredient !== '') {
    currentInventory.push(newIngredient);
    sessionStorage.setItem('inventory', JSON.stringify(currentInventory));
    let submitButton = document.getElementById("submitForm");
    submitButton.disabled = false;
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
    deleteButton.setAttribute("id", 'buttonSize');
    //Creates delete button, which, if clicked, removes the item from the list and the sessionStorage
    deleteButton.addEventListener("click", function () {
      ingredient.remove();
      let currentInventory = JSON.parse(sessionStorage.getItem('inventory'));
      currentInventory = currentInventory.filter(item => item !== element);
      sessionStorage.setItem('inventory', JSON.stringify(currentInventory));
      if (currentInventory.length == 0) {
        let submitButton = document.getElementById("submitForm");
        submitButton.disabled = true;
      }
    });
    ingredient.append(deleteButton);
    ul.append(ingredient);
  });
}

//favorites
function addShoppingIngredient() {
  let newShoppingIngredient = document.getElementById('shoppingInputText').value;
  let currentShoppingInventory = JSON.parse(sessionStorage.getItem('shoppingList'));
  if (!currentShoppingInventory.includes(newShoppingIngredient) && newShoppingIngredient !== '') {
    currentShoppingInventory.push(newShoppingIngredient);
    sessionStorage.setItem('shoppingList', JSON.stringify(currentShoppingInventory));
  }
  refreshShoppingList();
  document.querySelector('#shoppingInputText').value = null;
}

//Updates the ul of the inventory
function refreshShoppingList() {
  let ul = document.getElementById('shoppingList');
  //Clear list
  ul.innerHTML = '';
  //gets sessionStorage inventory
  let shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
  //generates list items for each item in the Inventory including a delete button for each ingredient
  shoppingList.forEach(element => {
    let ingredients = document.createElement('li');
    ingredients.append(element);
    let deleteButton2 = document.createElement('button');
    deleteButton2.type = 'button';
    deleteButton2.innerHTML = 'X';
    //Creates delete button, which, if clicked, removes the item from the list and the sessionStorage
    deleteButton2.addEventListener("click", function () {
      ingredients.remove();
      let currentInventory2 = JSON.parse(sessionStorage.getItem('shoppingList'));
      currentInventory2 = currentInventory2.filter(item => item !== element);
      sessionStorage.setItem('shoppingList', JSON.stringify(currentInventory2));
    });
    ingredients.append(deleteButton2);
    ul.append(ingredients);
  });
}

function clearList() {
  if (window.location.pathname == '/index.html' || window.location.pathname == '/') {
    let inventory = [];
    sessionStorage.setItem('inventory', JSON.stringify(inventory));
    refreshInventoryList();
    document.querySelector('#ingredientInput').value = null;
  } else if (window.location.pathname == '/favorites.html') {
    let shoppingList = [];
    sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    refreshShoppingList();
    document.querySelector('#shoppingInputText').value = null;
  }
}


const runMenuButton = () => {
  const menuButton = document.getElementsByClassName('menubutton')[0];
  const navLinks = document.getElementsByClassName('navlinks')[0];
  menuButton.addEventListener('click', function () {
    navLinks.classList.toggle('active');
  });
};

window.addEventListener('load', function () {
  if (!this.sessionStorage.getItem('favorites')) {
    let favorites = [];
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }
  if (window.location.pathname == '/index.html' || window.location.pathname == '/') {
    document.querySelector('#inputForm').addEventListener('submit', handleForm);
    document.getElementById('addIngredientButton').addEventListener('click', addIngredient);
    document.getElementById('clearButton').addEventListener('click', clearList);
    if (!this.sessionStorage.getItem('inventory') || JSON.parse(this.sessionStorage.getItem('inventory')).length == 0) {
      //document.getElementById('ingredientInput').addEventListener('keypress', addIngredient);
      let inventory = [];
      sessionStorage.setItem('inventory', JSON.stringify(inventory));
      let submitButton = document.getElementById("submitForm");
      submitButton.disabled = true;
    }
    let currentInventory = JSON.parse(sessionStorage.getItem('inventory'));
    if (currentInventory.length > 0) {
      refreshInventoryList();
    }
    runMenuButton();
    printAllRecipes(defaultRecipes);
  } else if (window.location.pathname == '/favorites.html') {
    document.getElementById('submitInput').addEventListener('click', addShoppingIngredient);
    document.getElementById('clearInput').addEventListener('click', clearList);
    if (!this.sessionStorage.getItem('shoppingList')) {
      let shoppingList = [];
      sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }
    let currentShoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
    if (currentShoppingList.length > 0) {
      refreshShoppingList();
    }
    runMenuButton();
    let favoriteRecipes = JSON.parse(sessionStorage.getItem('favorites'));
    printAllRecipes(favoriteRecipes);
  }
});