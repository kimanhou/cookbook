import React from 'react';
import NewCookware from './NewCookware';

interface INewCookwareListProps {
    cookware : string[];
    setCookware : React.Dispatch<React.SetStateAction<string[]>>;
}

const NewCookwareList : React.FC<INewCookwareListProps> = props => {
    return (
        <div>
            <p>Cookware</p>
            {props.cookware.map(cookware => <p>{cookware}</p>)}
            <NewCookware setCookware={props.setCookware}/>
        </div>
    );
}

export default NewCookwareList;