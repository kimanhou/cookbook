import React, { useState, useEffect } from 'react';
import Instruction from '../../../common/model/Instruction';

interface INewInstructionProps {
    instruction : Instruction;
}

const NewInstruction : React.FC<INewInstructionProps> = props => {

    const [stepNumber, setStepNumber] = useState<number>(props.instruction.getStepNumber());
    const onStepNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseFloat(event.target.value))) {
            setStepNumber(parseFloat(event.target.value));
            props.instruction.setStepNumber(parseFloat(event.target.value));
        }
    }

    const [text, setText] = useState<string>(props.instruction.getText());
    const onTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        props.instruction.setText(event.target.value);
    }

    useEffect(() => {
        setText(props.instruction.getText());
        setStepNumber(props.instruction.getStepNumber());
    }, [props.instruction]);

    return (
        <div>
            <label>Instructions</label>
            <input value={stepNumber} onChange={onStepNumberChange}></input>
            <textarea value={text} onChange={onTextChange}></textarea>
        </div>
    );
}

export default NewInstruction