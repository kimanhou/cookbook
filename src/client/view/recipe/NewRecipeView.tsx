import React, { useState } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';

interface INewRecipeViewProps{
    addRecipe: (recipe : Recipe) => void;
}

const NewRecipeView : React.FC<INewRecipeViewProps> = props => {
    const [text, setText] = useState("");
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }
    const onClick = () => {
        const recipe = Recipe.createRecipe(text);
        RecipeController.add(recipe)
            .then(recipe => props.addRecipe(recipe))
            .then(() => setText(""));
    }
    return (
        <div>
            <textarea value={text} onChange={onChange}/>
            <button onClick={onClick}>Add</button>
        </div>
    );
}
export default NewRecipeView;