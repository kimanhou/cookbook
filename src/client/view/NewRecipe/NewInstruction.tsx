import React, { useState } from 'react';
import Instruction from '../../../common/model/Instruction';

interface INewInstructionProps {
    setInstructions : React.Dispatch<React.SetStateAction<Instruction[]>>;
}

const NewInstruction : React.FC<INewInstructionProps> = props => {

    const [stepNumber, setStepNumber] = useState<string>("");
    const onStepNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStepNumber(event.target.value);
    }

    const [text, setText] = useState<string>("");
    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const addInstruction = () => {
        if(text !== "" && !isNaN(parseInt(stepNumber))) {
            const instruction = new Instruction(null, null, parseInt(stepNumber), text);
            props.setInstructions(instructions => [...instructions, instruction]);
            setText("");
            setStepNumber("");
        }
    }

    return (
        <div>
            <input value={stepNumber} onChange={onStepNumberChange}></input>
            <textarea value={text} onChange={onTextChange}></textarea>
            <button onClick={addInstruction}>Add</button>
        </div>
    );
}

export default NewInstruction