import React, { useState } from 'react';
import Ingredient from '../../../common/model/Ingredient';
import Instruction from '../../../common/model/Instruction';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import NewIngredientsList from './NewIngredientsList';
import NewInstructionsList from './NewInstructionsList';
import './NewRecipe.scss';

const AddNewRecipe : React.FC = props => {
    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const [serves, setServes] = useState<string>("");
    const onServesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setServes(event.target.value);
    }

    const [time, setTime] = useState<string>("");
    const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    }

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [instructions, setInstructions] = useState<Instruction[]>([]);

    const createRecipe = () => {
        const numberOfServings = !isNaN(parseInt(serves)) ? parseInt(serves) : 0;
        const cookware = ["poele", "fouet", "spatule"];
        const recipe = Recipe.createRecipe(name, numberOfServings, time, instructions, ingredients, cookware);
        RecipeController.add(recipe)
            .then(() => setName(""))
            .then(() => setInstructions([]))
            .then(() => setIngredients([]))
            .then(() => setTime(""))
            .then(() => setServes(""));
    }

    return (
        <div className={`new-recipe`}>
            <div>
                <label>Name</label>
                <input value={name} onChange={onNameChange}></input>
            </div>
            <div>
                <label>Serves</label>
                <input value={serves} onChange={onServesChange}></input>
            </div>
            <div>
                <label>Time</label>
                <input value={time} onChange={onTimeChange}></input>
            </div>
            <NewIngredientsList ingredients={ingredients} setIngredients={setIngredients}/>
            <NewInstructionsList instructions={instructions} setInstructions={setInstructions} />
            <button onClick={createRecipe}>Create</button>
        </div>
    );
}

export default AddNewRecipe;