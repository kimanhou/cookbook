import React, { useState } from 'react';

interface IAddableCookwareProps {
    cookware : string;
    addCookware : (cookware : string) => void;
}

const AddableCookware : React.FC<IAddableCookwareProps> = props => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>(props.cookware);

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            props.addCookware(inputText);
            setIsEditable(isEditable => !isEditable);
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }

    if (isEditable) {
        return (<input value={inputText} onKeyPress={onKeyPress} onChange={onChange}></input>);
    }
    return (<button onClick={() => setIsEditable(isEditable => !isEditable)}>Add cookware</button>);
}

export default AddableCookware;