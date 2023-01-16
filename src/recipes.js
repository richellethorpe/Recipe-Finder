export default class RecipeFinder {
  static async getRecipes(searchParams) {
    try {
      let food;
      let mealType;
      let health;
      let cookTime;
      let excluded;
      searchParams.ingredients === '' ? food = '' : food = `&q=${searchParams.ingredients}`;
      searchParams.mealType === '' ? mealType = '' : mealType = `&mealType=${searchParams.mealType}`;
      searchParams.health === '' ? health = '' : health = `&health=${searchParams.health}`;
      searchParams.cookTime === '' ? cookTime = '' : cookTime = `&time=${searchParams.cookTime}`;
      searchParams.excluded.length === 0 ? excluded = '' : excluded = `&exclude=${searchParams.excluded}`;

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
