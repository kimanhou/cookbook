import React, { useState } from 'react';
import Instruction from '../../../../common/model/Instruction';

interface IAddableInstructionProps {
    addInstruction : (instruction : Instruction) => void;
}

const AddableInstruction : React.FC<IAddableInstructionProps> = props => {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' && !isNaN(parseInt(stepNumber))) {
            const newInstruction = new Instruction(null, null, parseInt(stepNumber), text);
            props.addInstruction(newInstruction);
            setIsEditable(isEditable => !isEditable);
            setStepNumberText("");
            setTextText("");
        }
    }

    const [stepNumber, setStepNumberText] = useState<string>("");
    const onStepNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStepNumberText(event.target.value);
    }

    const [text, setTextText] = useState<string>("");
    const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextText(event.target.value);
    }

    if (isEditable) {
        return (
            <div>
                <input value={stepNumber} onKeyPress={onKeyPress} onChange={onStepNumberChange}></input>
                <input value={text} onKeyPress={onKeyPress} onChange={onTextChange}></input>
            </div>
        );
    }
    return (<button onClick={() => setIsEditable(isEditable => !isEditable)}>Add instruction</button>);
}

export default AddableInstruction;