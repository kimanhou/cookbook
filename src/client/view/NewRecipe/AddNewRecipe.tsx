import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import IngredientController from '../../business/controller/IngredientController';
import Ingredient from '../../../common/model/Ingredient';
import NewIngredient from './NewIngredient';
import NewInstruction from './NewInstruction';
import Instruction from '../../../common/model/Instruction';

const AddNewRecipe : React.FC = props => {
    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const emptyInstruction = new Instruction(null, null, 1, "");
    const [instruction, setInstruction] = useState<Instruction>(emptyInstruction);

    const emptyIngredient = new Ingredient(null, null, "", -1, "");
    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient);

    const createRecipe = () => {
        const recipe = Recipe.createRecipe(name, [instruction], [ingredient]);
        RecipeController.add(recipe)
            .then(() => setName(""))
            .then(() => setInstruction(emptyInstruction))
            .then(() => setIngredient(emptyIngredient));
    }

    return (
        <div className={`add-new-recipe`}>
            <label>Name</label>
            <input value={name} onChange={onNameChange}></input>
            <NewIngredient ingredient={ingredient} />
            <NewInstruction instruction={instruction} />
            <button onClick={createRecipe}>Create</button>
        </div>
    );
}

export default AddNewRecipe;