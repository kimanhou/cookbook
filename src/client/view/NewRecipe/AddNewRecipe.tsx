import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import IngredientController from '../../business/controller/IngredientController';
import Ingredient from '../../../common/model/Ingredient';
import NewIngredient from './NewIngredient';

const AddNewRecipe : React.FC = props => {
    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const [instructions, setInstructions] = useState<string>("");
    const onInstructionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInstructions(event.target.value);
    }

    const emptyIngredient = new Ingredient(null, null, "", -1, "")
    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient);

    const createRecipe = () => {
        const recipe = Recipe.createRecipe(name, [], [ingredient]);
        RecipeController.add(recipe)
            .then(() => setName(""))
            .then(() => setInstructions(""))
            .then(() => setIngredient(emptyIngredient));
    }

    return (
        <div className={`add-new-recipe`}>
            <label>Name</label>
            <input value={name} onChange={onNameChange}></input>
            <NewIngredient ingredient={ingredient} setIngredient={setIngredient}/>
            <label>Instructions</label>
            <textarea value={instructions} onChange={onInstructionsChange}></textarea>
            <button onClick={createRecipe}>Create</button>
        </div>
    );
}

export default AddNewRecipe;