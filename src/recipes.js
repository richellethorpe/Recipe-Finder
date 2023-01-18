export default class RecipeFinder {
    static async getRecipes(newUrl) {
      try {
        const response = await fetch(newUrl);

        const jsonResponse = await response.json();
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
          throw new Error(errorMessage);
        }
        // console.log("this is the response");
        // console.log(response);
        // console.log(jsonResponse);
        return jsonResponse;
      } catch (error) {
        return error;
      }
    }
  }