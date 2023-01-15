export default class RecipeFinder {
  static async getRecipes(recipeParams) {
    try {
      let food = `&q=${recipeParams.ingredients}`;
      let mealType = `&mealType=${recipeParams.mealType}`;
      let health = `&health=${recipeParams.health}`;
      let cookTime = `&time=${recipeParams.cookTime}`;
      let excluded = `&exclude=${recipeParams.excluded}`;
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public${food}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}${mealType}${health}${cookTime}${excluded}&random=true`);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      // console.log(response);
      // console.log(jsonResponse);
      return jsonResponse; 
    } catch(error) {
      return error;
    }
  }
}
