import React, { useState } from 'react';
import Ingredient from '../../../common/model/Ingredient';
import Instruction from '../../../common/model/Instruction';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import NewIngredient from './NewIngredient';
import NewInstruction from './NewInstruction';

const AddNewRecipe : React.FC = props => {
    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const [serves, setServes] = useState<number>(0);
    const onServesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseFloat(event.target.value))) {
            setServes(parseFloat(event.target.value));
        }
    }

    const [time, setTime] = useState<string>("");
    const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    }

    const emptyInstruction = new Instruction(null, null, 1, "");
    const [instruction, setInstruction] = useState<Instruction>(emptyInstruction);

    const emptyIngredient = new Ingredient(null, null, "", -1, "");
    const [ingredient, setIngredient] = useState<Ingredient>(emptyIngredient);

    const createRecipe = () => {
        const recipe = Recipe.createRecipe(name, serves, time, [instruction], [ingredient], ["pan", "fouet", "spatule"]);
        RecipeController.add(recipe)
            .then(() => setName(""))
            .then(() => setInstruction(emptyInstruction))
            .then(() => setIngredient(emptyIngredient));
    }

    return (
        <div className={`add-new-recipe`}>
            <label>Name</label>
            <input value={name} onChange={onNameChange}></input>
            <label>Serves</label>
            <input value={serves} onChange={onServesChange}></input>
            <label>Time</label>
            <input value={time} onChange={onTimeChange}></input>
            <NewIngredient ingredient={ingredient} />
            <NewInstruction instruction={instruction} />
            <button onClick={createRecipe}>Create</button>
        </div>
    );
}

export default AddNewRecipe;