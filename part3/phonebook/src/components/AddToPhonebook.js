import React from 'react';

const AddToPhonebook = ({ newName, setNewName, newNumber, setNewNumber, submitHandler }) => {


  return (
    <form>
      <div>
        name: <input onChange={e => setNewName(e.target.value)} value={newName} />
          number: <input onChange={e => setNewNumber(e.target.value)} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={submitHandler}>add</button>
      </div>
    </form>
  )
}

export default AddToPhonebook;