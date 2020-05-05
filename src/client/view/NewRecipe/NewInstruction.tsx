import React, { useState, useEffect } from 'react';
import Instruction from '../../../common/model/Instruction';

interface INewInstructionProps {
    setInstructions : React.Dispatch<React.SetStateAction<Instruction[]>>;
    newStepNumber : number;
}

const NewInstruction : React.FC<INewInstructionProps> = props => {
    const [stepNumber, setStepNumber] = useState<string>(`${props.newStepNumber}`);
    useEffect(() => {
        setStepNumber(`${props.newStepNumber}`);
    }, [props.newStepNumber]);
    const onStepNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStepNumber(event.target.value);
    }

    const [text, setText] = useState<string>("");
    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const addInstruction = () => {
        if(text !== "" && !isNaN(parseInt(stepNumber))) {
            const instruction = new Instruction(undefined, null, parseInt(stepNumber), text);
            props.setInstructions(instructions => [...instructions, instruction]);
            setText("");
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