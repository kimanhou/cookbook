import React, { useState } from 'react';
import Ingredient from '../../../../common/model/Ingredient';

interface IEditableIngredientProps {
    ingredient : Ingredient;
    setIngredient : (ingredient : Ingredient) => void;
}

const EditableIngredient : React.FC<IEditableIngredientProps> = props => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [name, setNameText] = useState<string>(props.ingredient.getName());
    const [quantity, setQuantityText] = useState<string>(props.ingredient.getQuantity().toString());
    const [unity, setUnityText] = useState<string>(props.ingredient.getUnity());

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            if (!isNaN(parseFloat(quantity))) {
                const ingredient = new Ingredient(props.ingredient.getId(), props.ingredient.getRecipeId(), name, parseFloat(quantity), unity);
                props.setIngredient(ingredient);
                setIsEditable(isEditable => !isEditable);
            }
        }
    }

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameText(event.target.value);
    }

    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantityText(event.target.value);
    }

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
    return (<p onDoubleClick={() => setIsEditable(isEditable => !isEditable)}>{props.ingredient.toString()}</p>);
}

export default EditableIngredient;