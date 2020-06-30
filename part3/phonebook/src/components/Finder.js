import React from 'react';
const a1 = 0;

const Finder = ({ setNewSearch, newSearch }) => {
    return (
        <div>
            Find: <input onChange={e => setNewSearch(e.target.value)} value={newSearch}></input>
        </div>
    )
}

export default Finder;