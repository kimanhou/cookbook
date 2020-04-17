import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';

interface INewRecipeViewProps{
    addRecipe: (recipe : Recipe) => void;
}

const NewRecipeView : React.FC<INewRecipeViewProps> = props => {
    const [recipeName, setRecipeName] = useState("");
    const [instructions, setInstructions] = useState("");
    const onRecipeNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRecipeName(event.target.value);
    }
    const onInstructionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInstructions(event.target.value);
    }
    const onClick = () => {
        const recipe = Recipe.createRecipe(recipeName, instructions, []);
        RecipeController.add(recipe)
            .then(recipe => props.addRecipe(recipe))
            .then(() => setRecipeName(""))
            .then(() => setInstructions(""));
    }
    return (
        <div>
            <textarea value={recipeName} onChange={onRecipeNameChange}/>
            <textarea value={instructions} onChange={onInstructionsChange}/>
            <button onClick={onClick}>Add</button>
        </div>
    );
}
export default NewRecipeView;