import React, { useState } from 'react';
import Instruction from '../../../../common/model/Instruction';

interface IEditableInstructionProps {
    instruction : Instruction;
    setInstruction : (instruction : Instruction) => void;
}

const EditableInstruction : React.FC<IEditableInstructionProps> = props => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [instructionText, setInstructionText] = useState<string>(props.instruction.getText());
    const [stepNumber, setStepNumberText] = useState<string>(props.instruction.getStepNumber().toString());

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            if (!isNaN(parseInt(stepNumber))) {
                const instruction = new Instruction(props.instruction.getId(), props.instruction.getRecipeId(), parseInt(stepNumber), instructionText);
                props.setInstruction(instruction);
                setIsEditable(isEditable => !isEditable);
            }
        }
    }

    const onInstructionTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInstructionText(event.target.value);
    }

    const onStepNumberTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStepNumberText(event.target.value);
    }

    if (isEditable) {
        return (
            <div>
                <input value={stepNumber} onKeyPress={onKeyPress} onChange={onStepNumberTextChange} />
                <input value={instructionText} onKeyPress={onKeyPress} onChange={onInstructionTextChange} />
            </div>
        );
    }
    return (<p onDoubleClick={() => setIsEditable(isEditable => !isEditable)}>{props.instruction.toString()}</p>);
}

export default EditableInstruction;