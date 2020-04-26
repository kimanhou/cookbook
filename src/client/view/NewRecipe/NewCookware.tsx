import React, { useState } from 'react';

interface INewCookwareProps {
    setCookware : React.Dispatch<React.SetStateAction<string[]>>;
}

const NewCookware : React.FC<INewCookwareProps> = props => {

    const [cookware, setCookware] = useState<string>("");
    const onCookwareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCookware(event.target.value);
    }

    const addCookware = () => {
        if(cookware !== "") {
            props.setCookware(cookwares => [...cookwares, cookware]);
            setCookware("");
        }
    }

    return (
        <div>
            <input value={cookware} onChange={onCookwareChange}></input>
            <button onClick={addCookware}>Add</button>
        </div>
    );
}

export default NewCookware;