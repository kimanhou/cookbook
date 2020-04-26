import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import EditableString from '../components/EditableString';
import RecipeController from '../../business/controller/RecipeController';

interface IRecipeDetailsViewProps {
    recipe : Recipe;
}

const RecipesDetailsView : React.FC<IRecipeDetailsViewProps> = props => {
    const [time, setTime] = useState(props.recipe.getTime());
    const setTimeText = (text : string) => {
        props.recipe.setTime(text);
        RecipeController.add(props.recipe);
        setTime(text);
    }


    return (
        <div>
            <h2>{props.recipe.getRecipeName()}</h2>
            <p>Serves {props.recipe.getNumberOfServings()}</p>
            <h3>Time</h3> 
            <EditableString text={time} setText={setTimeText} />
            <h3>Cookware</h3> 
            <p>{props.recipe.getCookwareToString()}</p>
            <h3>Ingredients</h3>
            {props.recipe.getIngredients().map(ingredient => <p>{ingredient.toString()}</p>)}
            <h3>Instructions</h3>
            {props.recipe.getInstructions().map(instruction => <p>{instruction.toString()}</p>)}
        </div>
    )
}

export default RecipesDetailsView;