import React from 'react';

const DisplayOne = ({each, deletion}) => {
    return(
    <>
    <p>{each.name}: {each.number}</p>
    <button onClick={() => deletion(each)}>Delete</button>
    </>
    )
}

const DisplayPhonebook = ({display, deletion}) => {
return(
    <div>
       {display.map(each => <DisplayOne key={each.name} deletion={deletion} each={each}></DisplayOne> )}
    </div>   
)
}

export default DisplayPhonebook;