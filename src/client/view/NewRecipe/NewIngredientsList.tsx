import React from 'react';
import Ingredient from '../../../common/model/Ingredient';
import NewIngredient from './NewIngredient';

interface INewIngredientsListProps {
    ingredients : Ingredient[];
    setIngredients : React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const NewIngredientsList : React.FC<INewIngredientsListProps> = props => {
    return (
        <div>
            <p>Ingredients</p>
            {props.ingredients.map(ingredient => <p>{ingredient.toString()}</p>)}
            <NewIngredient setIngredients={props.setIngredients}/>
        </div>
    );
}

export default NewIngredientsList;