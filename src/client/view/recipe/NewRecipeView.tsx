import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import Instruction from '../../../common/model/Instruction';
import Ingredient from '../../../common/model/Ingredient';

interface INewRecipeViewProps{
    addRecipe: (recipe : Recipe) => void;
}

const NewRecipeView : React.FC<INewRecipeViewProps> = props => {
    const [recipeName, setRecipeName] = useState("");
    const [instruction, setInstruction] = useState("");
    const [ingredient, setIngredient] = useState("");
    const onRecipeNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRecipeName(event.target.value);
    }
    const onInstructionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInstruction(event.target.value);
    }
    const onIngredientChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setIngredient(event.target.value);
    }
    const onClick = () => {
        const recipe = Recipe.createRecipe(recipeName, 
            [Instruction.createInstruction(null, 1, 1, instruction)], 
            [Ingredient.createIngredient(null, 1, ingredient, 1, "")]);
        RecipeController.add(recipe)
            .then(recipe => props.addRecipe(recipe))
            .then(() => setRecipeName(""))
            .then(() => setInstruction(""))
            .then(() => setIngredient(""));
    }
    return (
        <div>
            <textarea value={recipeName} onChange={onRecipeNameChange}/>
            <textarea value={instruction} onChange={onInstructionChange}/>
            <textarea value={ingredient} onChange={onIngredientChange}/>
            <button onClick={onClick}>Add</button>
        </div>
    );
}
export default NewRecipeView;