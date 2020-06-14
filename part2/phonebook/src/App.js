import React, { useState, useEffect} from 'react';
import AddToPhonebook from './components/AddToPhonebook';
import Finder from './components/Finder';
import DisplayPhonebook from './components/DisplayPhonebook';
import phonebookService from './services/Phonebook';
import phonebook from './services/Phonebook';
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  const [ notification, setNotification] = useState(null);
  const [ condition, setCondition ] = useState(''); 

  useEffect(()=>{
    phonebookService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const submitHandler = event => { 
    event.preventDefault();
    let newAddition = { name: newName, number: newNumber };
    const foundID = persons.find(obj => obj.name === newAddition.name);
    if(foundID){
      /* eslint-disable */
      if(confirm(`Do you want to update the number for ${newAddition.name}`)){
        setNotification('Phone number updated.');
        setCondition('success');
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        return( 
        phonebook
          .update(foundID.id, {...newAddition, id: foundID})
          
          .then(returnedPerson => {
            setPersons(persons.map(each => each.id != foundID.id ? each : returnedPerson));
            setNewName('');
            setNewNumber('');})

          .catch(error => {
            setCondition('error');
            setNotification(`${newAddition.name} was removed from the server.`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
            phonebookService
              .getAll()
              .then(response => setPersons(response))
          })

          
    )}};

    phonebookService
      .create(newAddition)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('');
        setNewNumber('');
      })
      setNotification('Person added to the phonebook.');
      setCondition('success');
      setTimeout(() => {
        setNotification(null)
      }, 5000)
  }

  const deletion = each => {
    /* eslint-disable */
    if(confirm(`Are you sure you want to delete ${each.name}`)){
      phonebook
      .remove(each.id);
      phonebookService
      .getAll()
      .then(response => setPersons(response))
    }
  }

  const newRegex = new RegExp(newSearch, 'gi')
  const display = persons.filter(obj => obj.name.match(newRegex));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={condition} message={notification}></Notification>
      <Finder setNewSearch={setNewSearch} newSearch={newSearch}></Finder>
      <AddToPhonebook newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} submitHandler={submitHandler}></AddToPhonebook>
      <h2>Numbers</h2>
      <DisplayPhonebook display={display} deletion={deletion}></DisplayPhonebook>
    </div>
  )
}

export default App
