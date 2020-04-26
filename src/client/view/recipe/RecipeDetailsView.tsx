import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import EditableString from '../components/EditableString';
import RecipeController from '../../business/controller/RecipeController';

interface IRecipeDetailsViewProps {
    recipe : Recipe;
}

const RecipesDetailsView : React.FC<IRecipeDetailsViewProps> = props => {
    const [time, setTime] = useState<string>(props.recipe.getTime());
    const setTimeText = (text : string) => {
        props.recipe.setTime(text);
        RecipeController.add(props.recipe);
        setTime(text);
    }

    const [serves, setServes] = useState<string>(props.recipe.getNumberOfServings().toString());
    const setServesText = (text : string) => {
        if (!isNaN(parseInt(text))) {
            props.recipe.setNumberOfServings(parseInt(text));
            RecipeController.add(props.recipe);
            setServes(text);
        }
    }

    const [cookware, setCookware] = useState<string[]>(props.recipe.getCookware());
    const setCookwareText = (text : string, index : number) => {
        props.recipe.setCookwareAt(text, index);
        RecipeController.add(props.recipe);
        setCookware(cookwares => {
            const clone = cookwares.slice();
            clone[index] = text;
            return clone;
        });
    }

    return (
        <div>
            <h2>{props.recipe.getRecipeName()}</h2>
            <h3>Serves</h3> 
            <EditableString text={serves} setText={setServesText} />
            <h3>Time</h3> 
            <EditableString text={time} setText={setTimeText} />
            <h3>Cookware</h3> 
            {props.recipe.getCookware().map((cookware, index) => <EditableString text={cookware} setText={text => setCookwareText(text, index)}/>)}
            <h3>Ingredients</h3>
            {props.recipe.getIngredients().map(ingredient => <p>{ingredient.toString()}</p>)}
            <h3>Instructions</h3>
            {props.recipe.getInstructions().map(instruction => <p>{instruction.toString()}</p>)}
        </div>
    )
}

export default RecipesDetailsView;