import Recipe from "../../../common/model/Recipe";

class RecipeController {
    getAll = () => {
        return fetch("/api/recipes")
            .then(response => response.json())
            .then((resultArray : any[]) => resultArray.map(Recipe.deserialize));
    }
    
    add = (recipe : Recipe) => {
        return fetch("/api/recipes", {
                method : "POST",
                body : JSON.stringify(recipe),
                headers: {'Content-Type' : 'application/json'}
            })
            .then(response => response.json())
            .then(Recipe.deserialize);
    }

    delete = (recipe : Recipe) => {
        return fetch(`/api/recipes/${recipe.id}`, {
                method : "DELETE"
            });
    }
}
export default new RecipeController();