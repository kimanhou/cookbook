import React from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeController from '../../business/controller/RecipeController';
import { useHistory } from 'react-router-dom';
import './RecipeView.scss';

interface IRecipeViewProps{
    recipe : Recipe;
    deleteRecipe : () => void;
}

const RecipeView : React.FC<IRecipeViewProps> = props => {
    const history = useHistory();

    const onDelete = () => {
        RecipeController.delete(props.recipe)
            .then(props.deleteRecipe);
    }

    const openRecipe = () => {
        if (props.recipe.getId() != null) {
            history.push(`/recipes/${props.recipe.getId()}`);
        }
    }
    return (
        <div className={`recipe-name`}>
            <p onClick={openRecipe}>{props.recipe.getRecipeName()}</p>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}
export default RecipeView;