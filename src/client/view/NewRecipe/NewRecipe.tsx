import React, { useState } from 'react';
import Ingredient from '../../../common/model/Ingredient';
import Instruction from '../../../common/model/Instruction';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import NewIngredientsList from './NewIngredientsList';
import NewInstruction from './NewInstruction';
import './NewRecipe.scss';

const AddNewRecipe : React.FC = props => {
    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const [serves, setServes] = useState<number | undefined>(undefined);
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

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const createRecipe = () => {
        const numberOfServings = serves != null ? serves : 0;
        const cookware = ["poele", "fouet", "spatule"];
        const instructions = [instruction, new Instruction(null, null, 2, "Faire fondre le beurre avec le chocolat")];
        const recipe = Recipe.createRecipe(name, numberOfServings, time, instructions, ingredients, cookware);
        RecipeController.add(recipe)
            .then(() => setName(""))
            .then(() => setInstruction(emptyInstruction))
            .then(() => setIngredients([]))
            .then(() => setTime(""))
            .then(() => setServes(undefined));
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
            <NewInstruction instruction={instruction} />
            <button onClick={createRecipe}>Create</button>
        </div>
    );
}

export default AddNewRecipe;