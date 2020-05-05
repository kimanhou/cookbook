import React, { useState } from 'react';
import Ingredient from '../../../../common/model/Ingredient';

interface IAddableIngredientProps {
    addIngredient : (ingredient : Ingredient) => void;
}

const AddableIngredient : React.FC<IAddableIngredientProps> = props => {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && !isNaN(parseFloat(quantity))) {
            const newIngredient = new Ingredient(undefined, null, name, parseFloat(quantity), unity);
            props.addIngredient(newIngredient);
            setIsEditable(isEditable => !isEditable);
            setNameText("");
            setUnityText("");
            setQuantityText("");
        }
    }

    const [name, setNameText] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameText(event.target.value);
    }

    const [quantity, setQuantityText] = useState<string>("");
    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantityText(event.target.value);
    }

    const [unity, setUnityText] = useState<string>("");
    const onUnityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnityText(event.target.value);
    }

    if (isEditable) {
        return (
            <div>
                <input value={name} onKeyPress={onKeyPress} onChange={onNameChange}></input>
                <input value={quantity} onKeyPress={onKeyPress} onChange={onQuantityChange}></input>
                <input value={unity} onKeyPress={onKeyPress} onChange={onUnityChange}></input>
            </div>
        );
    }
    return (<button onClick={() => setIsEditable(isEditable => !isEditable)}>Add ingredient</button>);
}

export default AddableIngredient;