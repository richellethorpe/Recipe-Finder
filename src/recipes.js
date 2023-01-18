export default class RecipeFinder {
  static async getRecipes(searchObject) {
    try {
      let ingredients;
      let mealType;
      let health;
      let cookTime;
      let excluded;
      searchObject.ingredients === '' ? ingredients = '' : ingredients = `&q=${searchObject.ingredients}`;
      searchObject.mealType === '' ? mealType = '' : mealType = `&mealType=${searchObject.mealType}`;
      searchObject.health === '' ? health = '' : health = `&health=${searchObject.health}`;
      searchObject.cookTime === '' ? cookTime = '' : cookTime = `&time=${searchObject.cookTime}`;
      searchObject.excluded.length === 0 ? excluded = '' : excluded = `&exclude=${searchObject.excluded}`;
     
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public${ingredients}&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}${mealType}${health}${cookTime}${excluded}&random=true`);
      
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      // console.log('response', response);
      // console.log('jsonResponse', jsonResponse);
      // console.log('response url', response.url);
      return jsonResponse; 
    } catch(error) {
      return error;
    }
  }
}