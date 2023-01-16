export default class RecipeFinder {
  static async getRecipes(food, mealType) {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=${process.env.app_id}&app_key=${process.env.app_key}&mealType=${mealType}&random=true`);
      //(`https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=d760aafd&app_key=fb7afac050e24a5419954376cafa27ad&mealType=${mealType}&random=true`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
        throw new Error(errorMessage);
      }
      // console.log(response);
      // console.log(jsonResponse);
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
}
