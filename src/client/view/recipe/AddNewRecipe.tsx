import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';

const AddNewRecipe : React.FC = props => {
    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const [instructions, setInstructions] = useState<string>("");
    const onInstructionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInstructions(event.target.value);
    }

    const createRecipe = () => {
        const recipe = Recipe.createRecipe(name, instructions, []);
        RecipeController.add(recipe)
            .then(() => setName(""))
            .then(() => setInstructions(""));
    }

    return (
        <div className={`add-new-recipe`}>
            <label>Name</label>
            <input value={name} onChange={onNameChange}></input>
            <label>Instructions</label>
            <textarea value={instructions} onChange={onInstructionsChange}></textarea>
            <button onClick={createRecipe}>Create</button>
        </div>
    );
}

export default AddNewRecipe;