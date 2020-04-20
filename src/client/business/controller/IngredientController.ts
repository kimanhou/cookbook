import Ingredient from "../../../common/model/Ingredient";

class IngredientController {
    getAll = (recipeId : number) => {
        return fetch(`/api/recipes/${recipeId}/ingredients/`)
            .then(response => response.json())
            .then((resultArray : any[]) => resultArray.map(Ingredient.deserialize));
    }

    get = (id : number) => {
        return fetch(`/api/ingredients/${id}/`)
            .then(response => response.json())
            .then((result : any) => Ingredient.deserialize(result));
    }
    
    add = (ingredient : Ingredient) => {
        return fetch(`/api/ingredients`, {
                method : "POST",
                body : JSON.stringify(ingredient),
                headers: {'Content-Type' : 'application/json'}
            })
            .then(response => response.json())
            .then(Ingredient.deserialize);
    }

    delete = (ingredient : Ingredient) => {
        return fetch(`/api/ingredients/${ingredient.getId()}`, {
                method : "DELETE"
            });
    }
}
export default new IngredientController();