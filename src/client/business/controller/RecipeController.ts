import Recipe from "../../../common/model/Recipe";

class RecipeController {
    getAll = () => {
        return fetch("/api/recipes")
            .then(response => response.json())
            .then((resultArray : any[]) => resultArray.map(Recipe.deserialize));
    }

    get = (id : number) => {
        return fetch(`/api/recipes/${id}`)
            .then(response => response.json())
            .then((result : any) => Recipe.deserialize(result));
    }
    
    add = (recipe : Recipe) => {
        return fetch("/api/recipes", {
                method : "POST",
                body : JSON.stringify(recipe),
                headers: {'Content-Type' : 'application/json'}
            })
            .then((response) => response.json())
            .then(Recipe.deserialize);
    }

    delete = (recipe : Recipe) => {
        return fetch(`/api/recipes/${recipe.getId()}`, {
                method : "DELETE"
            });
    }
}
export default new RecipeController();