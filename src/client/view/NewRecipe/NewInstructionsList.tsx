import React, { useState } from 'react';
import Instruction from '../../../common/model/Instruction';
import NewInstruction from './NewInstruction';

interface INewInstructionsListProps {
    instructions : Instruction[];
    setInstructions : React.Dispatch<React.SetStateAction<Instruction[]>>;
}

const NewInstructionsList : React.FC<INewInstructionsListProps> = props => {
    const newStepNumber = props.instructions.length > 0 ? Math.max(...props.instructions.map(t => t.getStepNumber())) + 1 : 1;
    return (
        <div>
            <p>Instructions</p>
            {props.instructions.sort((a, b) => a.getStepNumber() - b.getStepNumber()).map(instruction => <p>{instruction.toString()}</p>)}
            <NewInstruction setInstructions={props.setInstructions} newStepNumber={newStepNumber}/>
        </div>
    );
}

export default NewInstructionsList;