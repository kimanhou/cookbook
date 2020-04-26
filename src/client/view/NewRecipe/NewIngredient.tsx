import React, { useState } from 'react';
import Ingredient from '../../../common/model/Ingredient';

interface INewIngredientProps {
    setIngredients : React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const NewIngredient : React.FC<INewIngredientProps> = props => {

    const [name, setName] = useState<string>("");
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const [quantity, setQuantity] = useState<undefined | number>(undefined);
    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseFloat(event.target.value))) {
            setQuantity(parseFloat(event.target.value));
        }
    }

    const [unity, setUnity] = useState<string>("");
    const onUnityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnity(event.target.value);
    }

    const addIngredient = () => {
        if(name !== "" && quantity != null){
            const ingredient = new Ingredient(null, null, name, quantity, unity);
            props.setIngredients(ingredients => [...ingredients, ingredient]);
            setName("");
            setQuantity(0);
            setUnity("");
        }
    }

    return (
        <div>
            <input value={name} onChange={onNameChange}></input>
            <input value={quantity} onChange={onQuantityChange}></input>
            <input value={unity} onChange={onUnityChange}></input>
            <button onClick={addIngredient}>Add</button>
        </div>
    );
}

export default NewIngredient;