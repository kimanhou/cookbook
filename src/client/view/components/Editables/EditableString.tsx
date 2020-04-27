import React, { useState } from 'react';

interface IEditableStringProps {
    text : string;
    setText : (text : string) => void;
}

const EditableString : React.FC<IEditableStringProps> = props => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>(props.text);

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            props.setText(inputText);
            setIsEditable(isEditable => !isEditable);
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    }

    if (isEditable) {
        return (<input value={inputText} onKeyPress={onKeyPress} onChange={onChange}></input>);
    }
    return (<p onDoubleClick={() => setIsEditable(isEditable => !isEditable)}>{props.text}</p>);
}

export default EditableString;