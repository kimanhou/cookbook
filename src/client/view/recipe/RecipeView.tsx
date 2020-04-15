import React from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';

interface IRecipeViewProps{
    recipe : Recipe;
    deleteRecipe : () => void;
}

const RecipeView : React.FC<IRecipeViewProps> = props => {
    const onDelete = () => {
        RecipeController.delete(props.recipe)
            .then(props.deleteRecipe);
    }
    return (
        <div>
            {props.recipe.text}
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}
export default RecipeView;