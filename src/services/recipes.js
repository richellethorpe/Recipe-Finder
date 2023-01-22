export default class RecipeFinder {

  //Creates search object based on form input fields
  constructor() {
    this.ingredients = '';
    this.mealType = '';
    this.health = '';
    this.cookTime = '';
    this.excluded = '';
  }

  //Pulls the form and sessionStorage data and populates the object's attributes
  parseForm() {
    //Creates Ingredients query term from the session storage array
    this.ingredients = JSON.parse(sessionStorage.getItem('inventory')).toString();
    this.mealType = document.querySelector('#mealSelection').value;
    this.health = document.querySelector('#health').value;
    this.cookTime = document.querySelector('#cookTime').value;
    this.excluded = document.querySelector('#excluded').value;
  }

  //Sends API based on input fields found in the search object
  static async getRecipes() {
    try {
      const searchObject = new RecipeFinder();
      searchObject.parseForm();
      //Specifies returns of API Call
      let returnField = ["image", "url", "label", "healthLabels"];
      let returnFieldQuery = "";
      returnField.forEach(element => {
        returnFieldQuery += `&field=${element}`;
      });


      let ingredients, mealType, health, cookTime, excluded;

      searchObject.ingredients === '' ? ingredients = '' : ingredients = `&q=${searchObject.ingredients}`;
      searchObject.mealType === '' ? mealType = '' : mealType = `&mealType=${searchObject.mealType}`;
      searchObject.health === '' ? health = '' : health = `&health=${searchObject.health}`;
      searchObject.cookTime === '' ? cookTime = '' : cookTime = `&time=${searchObject.cookTime}`;
      searchObject.excluded === '' ? excluded = '' : excluded = `&exclude=${searchObject.excluded}`;

      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public${ingredients}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}${mealType}${health}${cookTime}${excluded}&random=true${returnFieldQuery}`);

      const jsonResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
}