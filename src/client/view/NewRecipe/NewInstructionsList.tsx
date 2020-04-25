import React from 'react';
import Instruction from '../../../common/model/Instruction';
import NewInstruction from './NewInstruction';

interface INewInstructionsListProps {
    instructions : Instruction[];
    setInstructions : React.Dispatch<React.SetStateAction<Instruction[]>>;
}

const NewInstructionsList : React.FC<INewInstructionsListProps> = props => {
    return (
        <div>
            <p>Instructions</p>
            {props.instructions.map(instruction => <p>{instruction.toString()}</p>)}
            <NewInstruction setInstructions={props.setInstructions}/>
        </div>
    );
}

export default NewInstructionsList;