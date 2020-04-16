import React from 'react';
import Recipe from '../../../common/model/Recipe';

interface IRecipeDetailsViewProps {
    recipe : Recipe;
}

const RecipesDetailsView : React.FC<IRecipeDetailsViewProps> = props => {
    return (
        <div>
            <h2>Details of {props.recipe.recipeName}</h2>
            <h3>Instructions</h3>
            <p>{props.recipe.instructions}</p>
        </div>
    )
}

export default RecipesDetailsView;