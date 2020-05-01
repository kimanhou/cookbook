import React, { useState } from 'react';

interface ISearchBarProps {
    setFilter : (filter : string) => void;
}

const SearchBar : React.FC<ISearchBarProps> = props => {
    const [newSearch, setNewSearch] = useState<string>("");
    const onNewSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setNewSearch(event.target.value);
    }
    const search = () => props.setFilter(newSearch);

    const onKeyPress = (event : React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            search();
        }
    }

    const clearSearch = () => {
        props.setFilter("");
        setNewSearch("");
    }

    return (
        <div>
            <input type="text" placeholder="Search..." value={newSearch} onChange={onNewSearchChange} onKeyPress={onKeyPress}></input>
            <button onClick={clearSearch}>X</button>
        </div>
    );
}

export default SearchBar;