import React, { useState, useEffect } from 'react';
import Ingredient from '../../../common/model/Ingredient';

interface INewIngredientProps {
    ingredient : Ingredient;
}

const NewIngredient : React.FC<INewIngredientProps> = props => {

    const [name, setName] = useState<string>(props.ingredient.getName());
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        props.ingredient.setName(event.target.value);
    }

    const [quantity, setQuantity] = useState<number>(props.ingredient.getQuantity());
    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseFloat(event.target.value))) {
            setQuantity(parseFloat(event.target.value));
            props.ingredient.setQuantity(parseFloat(event.target.value));
        }
    }

    const [unity, setUnity] = useState<string>(props.ingredient.getUnity());
    const onUnityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnity(event.target.value);
        props.ingredient.setUnity(event.target.value);
    }

    useEffect(() => {
        setName(props.ingredient.getName());
        setQuantity(props.ingredient.getQuantity());
        setUnity(props.ingredient.getUnity());
    }, [props.ingredient]);


    return (
        <div>
            <label>Ingredients</label>
            <input value={name} onChange={onNameChange}></input>
            <input value={quantity} onChange={onQuantityChange}></input>
            <input value={unity} onChange={onUnityChange}></input>
        </div>
    );
}

export default NewIngredient;