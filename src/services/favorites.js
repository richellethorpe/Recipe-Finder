import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


//UI Logic

async function handleForm(event) {
  event.preventDefault();
  document.querySelector('#shoppingInput').value = null;
}

  function addShoppingIngredient() {
    let newShoppingIngredient = document.querySelector('#shoppingInput').value;
    let currentShoppingInventory = JSON.parse(sessionStorage2.getItem('inventory2'));
    if (!currentShoppingInventory.includes(newShoppingIngredient) && newShoppingIngredient!=='') {
      currentShoppingInventory.push(newShoppingIngredient);
      sessionStorage2.setItem('inventory2', JSON.stringify(currentShoppingInventory));
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
  let inventory2 = JSON.parse(sessionStorage2.getItem('inventory2'));
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
      let currentInventory2 = JSON.parse(sessionStorage2.getItem('inventory2'));
      currentInventory2 = currentInventory2.filter(item => item !== element);
      sessionStorage2.setItem('inventory2', JSON.stringify(currentInventory2));
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
  document.querySelector('#shoppingInput').addEventListener('submit', handleForm);
  document.getElementById('submitInput').addEventListener('click', addShoppingIngredient);
  let inventory2 = [];
  sessionStorage2.setItem('inventory2', JSON.stringify(inventory2));
  runMenuButton();
});