import React, { useState ,useEffect} from 'react';

//PhoneBook
//Agenda telefonica

import personService from './services/persons';
//import axios from 'axios';

const Filter = ({filtro,onChange})=>{

  return(
          <>
          filter show as: <input type="text" value={filtro} onChange={onChange} />
          <br/>
          </>
      );
}

const PersonForm=({addName,newName,newNumber,onChangeNewName,onChangeNewNumber})=>{

  return (
      <form onSubmit={addName}>
      <div>
          name: <input type="text" value={newName} onChange={onChangeNewName} />
          number: <input type="text" value={newNumber} onChange={onChangeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
      );
}
const Persons=({personsToShow,deleteName})=>{

    return (

      <ul>
        {personsToShow.map(person=> <li key={person.id}>{person.name} {person.number}<button onClick={()=>deleteName(person.id)}>Delete</button></li>)}
      </ul>

    )
}

const App = () => {
 


  const [persons, setPersons] = useState([]);

  const [ newName, setNewName ] = useState('');
  const [newNumber,setNewNumber]=useState('');
  const [filtro,setFiltro]=useState('');


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
      console.log("newName",newName);
      //Proceso el NewName

      if (persons.find(person=>person.name===newName)){
          
           if (window.confirm(`${newName} is already added to phonebook,replace old number with a new one? `))
            {
              const [personToUpdate]=persons.filter(person=>person.name===newName);
              console.log("personToUpdate=",personToUpdate);
              console.log("id",personToUpdate.id);
              console.log("Actualizar el numero");
              const objPersonUpDated={...personToUpdate,number:newNumber};
          
             personService.update(personToUpdate.id,objPersonUpDated)
             .then (dataUpdate => setPersons(persons.map(person=>person.id===personToUpdate.id?dataUpdate:person)) )
           }

      } else {
        const objPerson={name:newName,number:newNumber};
       
        //Guardar en el servidor
        
        personService.create(objPerson)
        .then (data=> setPersons(persons.concat(data)))
        .catch(e=>console.log("Ha ocurrido el siguiente error:",e));

      }
     
      
      setNewName('');
      setNewNumber('');
  };
  //console.log(newNumber);
  //console.log(filtro);
   const deleteName = (id)=>{



        const [personToDelete]=persons.filter(person=>person.id===id);

        console.log('persontodelete',personToDelete);
        console.log('persontodelete.name',personToDelete.name);

        //nameToDelete=nameToDelete.reduce((acc,person)=> acc+person.name,"");

        

        if  (window.confirm(`Delete a ${personToDelete.name}?`) )
        {
              console.log("Eliminado al person con id",id);

      
                personService.deletePerson(id)
                .then (status=> { 
                                if (status===200){
                                setPersons(persons.filter(person=>person.id!==id));
                                }

                  })
          }        
   };


  const hookObtenerPersons =()=>{
  
      personService.getAll()
      .then ( data =>setPersons(data) )
      .catch(e=> console.log("Ha ocurrido el error:",e));


  };
  useEffect(hookObtenerPersons,[]);
  
 

  const personsToShow= (filtro===''? persons:persons.filter(person=>RegExp(filtro,"gi").test(person.name)));

  console.log("personsToShow",personsToShow);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtro={filtro} onChange={onChangeFiltro}/>
    
      <h3>Add a New</h3>
      <PersonForm addName={addName} newName={newName} onChangeNewName={onChangeNewName} newNumber={newNumber} onChangeNewNumber={onChangeNewNumber}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deleteName={deleteName}/>
      
    </div>
  )
}

export default App;
