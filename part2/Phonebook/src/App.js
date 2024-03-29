//PhoneBook
import React, { useState ,useEffect} from 'react';
import personService from './services/persons';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [newNumber,setNewNumber]=useState('');
  const [filtro,setFiltro]=useState('');
  const [opExitosa,setOpExitosa]=useState(null);
  const [errorMessage,setErrorMessage]=useState(null);
  
  const onChangeNewName=(e)=>{
      setNewName(e.target.value);
  };

  const onChangeNewNumber=(e)=>{
    setNewNumber(e.target.value);  
};

const onChangeFiltro=(e)=>{
    setFiltro(e.target.value);
};

  const addName=(e)=>{
      e.preventDefault();
      //Proceso el NewName

    
      if (persons.find(person=>person.name===newName)){
          
           if (window.confirm(`${newName} is already added to phonebook,replace old number with a new one? `))
            {
              const [personToUpdate]=persons.filter(person=>person.name===newName);
              const objPersonUpDated={...personToUpdate,number:newNumber};
             personService.update(personToUpdate.id,objPersonUpDated)
            .then (dataUpdate =>{ 
                                  setPersons(persons.map(person=>person.id===personToUpdate.id?dataUpdate:person));
                                  setOpExitosa(`${newName} is update`);
                                  setTimeout(()=>{ setOpExitosa(null)},3000);

                                })
             .catch(e=>{
                          console.log(`Ha ocurrido un error al actualzar a ${personToUpdate.name} `);
                          console.log("Ha ocurrido el error:",e);
                          setErrorMessage(`Ha ocurrido un error al actualizar a ${personToUpdate.name} `);
                          setTimeout(()=>{setErrorMessage(null);},3000);
                          setPersons(persons.filter(person=>person.id!==personToUpdate.id));

             });                   
           }

      }
       else {
       
        const objPerson={name:newName,number:newNumber};       
        //Agregar en el servidor
        personService.create(objPerson)
        .then (data=> { 
                        setPersons(persons.concat(data));
                        setOpExitosa(`${newName} is added`);
                        setTimeout(()=>{ setOpExitosa(null)},3000); 
        
                      })
        .catch(e=>console.log("Ha ocurrido el siguiente error:",e));
      } // del bloque que permite editar un nombre existente
      setNewName('');
      setNewNumber('');
  };
   const deleteName = (id)=>{
        const [personToDelete]=persons.filter(person=>person.id===id);

        if  (window.confirm(`Delete a ${personToDelete.name}?`) )
        {
                personService.deletePerson(id)
                .then (status=> { 
                                if (status===204){
                                     setPersons(persons.filter(person=>person.id!==id));
                                     setOpExitosa(`${personToDelete.name} is  deleted`);
                                     setTimeout(()=>{ setOpExitosa(null)},3000);
                                }
                  })
                  .catch(e =>{
                              setErrorMessage(`${personToDelete.name} is already removed from server `);
                              setTimeout(()=>{ setErrorMessage(null)},3000);
                              setPersons(persons.filter(person=>person.id!==personToDelete.id));

                  });
          }        
   };


  const hookObtenerPersons =()=>{
      personService.getAll()
      .then ( data =>setPersons(data) )
      .catch(e=> console.log("Ha ocurrido el error:",e));
  };
  useEffect(hookObtenerPersons,[]);
  
  const personsToShow= (filtro===''? persons:persons.filter(person=>RegExp(filtro,"gi").test(person.name)));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtro={filtro} onChange={onChangeFiltro}/>
    
      <h3>Add a New</h3>
      <PersonForm addName={addName} newName={newName} onChangeNewName={onChangeNewName} newNumber={newNumber} onChangeNewNumber={onChangeNewNumber}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deleteName={deleteName}/> 
      <Notification message={opExitosa} type='exito'/>  
      <Notification message={errorMessage} type='error'/> 

    </div>
  )
}

export default App;