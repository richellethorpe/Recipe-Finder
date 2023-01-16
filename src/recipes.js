export default class RecipeFinder {
  static async getRecipes(recipeParams) {
    try {
      let food;
      let mealType;
      let health;
      let cookTime;
      let excluded;

      recipeParams.ingredients === '' ? food = '' : food = `&q=${recipeParams.ingredients}`;

      recipeParams.mealType === '' ? mealType = '' : mealType = `&mealType=${recipeParams.mealType}`;

      recipeParams.health === '' ? health = '' : health = `&health=${recipeParams.health}`;

      recipeParams.cookTime === '' ? cookTime = '' : cookTime = `&time=${recipeParams.cookTime}`;

      recipeParams.excluded.length === 0 ? excluded = '' : excluded = `&exclude=${recipeParams.excluded}`;
      
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public${food}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}${mealType}${health}${cookTime}${excluded}&random=true`);
      const jsonResponse = await response.json();
      console.log('jsonResponse', jsonResponse);
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      console.log('response', response);
      console.log('response url', response.url);

      // console.log(jsonResponse);
      return jsonResponse; 
    } catch(error) {
      return error;
    }
  }
}
