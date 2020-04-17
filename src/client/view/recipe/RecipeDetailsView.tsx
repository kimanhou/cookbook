import React from 'react';
import Recipe from '../../../common/model/Recipe';

interface IRecipeDetailsViewProps {
    recipe : Recipe;
}

const RecipesDetailsView : React.FC<IRecipeDetailsViewProps> = props => {
    return (
        <div>
            <h2>{props.recipe.getRecipeName()}</h2>
            <h3>Ingredients</h3>
            {props.recipe.getIngredients().map(ingredient => <p>{ingredient.toString()}</p>)}
            <h3>Instructions</h3>
            <p>{props.recipe.getInstructions()}</p>
        </div>
    )
}

export default RecipesDetailsView;