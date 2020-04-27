import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import EditableString from '../components/Editables/EditableString';
import RecipeController from '../../business/controller/RecipeController';
import EditableInstruction from '../components/Editables/EditableInstruction';
import Instruction from '../../../common/model/Instruction';
import InstructionController from '../../business/controller/InstructionController';
import Ingredient from '../../../common/model/Ingredient';
import IngredientController from '../../business/controller/IngredientController';
import EditableIngredient from '../components/Editables/EditableIngredient';

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

    const [instructions, setInstructions] = useState<Instruction[]>(props.recipe.getInstructions());
    const setInstructionText = (instruction : Instruction) => {
        InstructionController.add(instruction);
        setInstructions(instructions => {
            let clone = instructions.filter(t => t.getId() != instruction.getId());
            clone = [...clone, instruction];
            return clone;
        });
    }

    const [ingredients, setIngredients] = useState<Ingredient[]>(props.recipe.getIngredients());
    const setIngredientText = (ingredient : Ingredient) => {
        IngredientController.add(ingredient);
        setIngredients(ingredients => {
            let clone = ingredients.filter(t => t.getId() != ingredient.getId());
            clone = [...clone, ingredient];
            return clone;
        });
    }

    const deleteCookware = (index : number) => {
        const clone = props.recipe.getCookware().filter((t, myIndex) => myIndex != index);
        props.recipe.setCookware(clone);
        RecipeController.add(props.recipe);
        setCookware(cookwares => {
            const clone = cookwares.filter((t, myIndex) => myIndex != index);
            return clone;
        });
    }

    const deleteIngredient = (ingredient : Ingredient) => {
        IngredientController.delete(ingredient);
        setIngredients(ingredients => ingredients.filter(t => t.getId() != ingredient.getId()));
    }

    const deleteInstruction = (instruction : Instruction) => {
        InstructionController.delete(instruction);
        setInstructions(instructions => instructions.filter(t => t.getId() != instruction.getId()));
    }

    return (
        <div>
            <h2>{props.recipe.getRecipeName()}</h2>
            <h3>Serves</h3> 
            <EditableString text={serves} setText={setServesText} />
            <h3>Time</h3> 
            <EditableString text={time} setText={setTimeText} />
            <h3>Cookware</h3> 
            {cookware.map((cookware, index) => 
                <div>
                    <EditableString text={cookware} setText={text => setCookwareText(text, index)}/> 
                    <button onClick={t => deleteCookware(index)}>X</button>
                </div>)}
            <h3>Ingredients</h3>
            {ingredients.map(ingredient => 
                <div>
                    <EditableIngredient ingredient={ingredient} setIngredient={setIngredientText}/>
                    <button onClick={t => deleteIngredient(ingredient)}>X</button>
                </div>)}
            <h3>Instructions</h3>
            {instructions.sort((a, b) => a.getStepNumber() - b.getStepNumber()).map(instruction => 
                <div>
                    <EditableInstruction instruction={instruction} setInstruction={setInstructionText}/>
                    <button onClick={t => deleteInstruction(instruction)}>X</button>
                </div>)}
        </div>
    )
}

export default RecipesDetailsView;