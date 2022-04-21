import React from 'react';

const Persons=({personsToShow,deleteName})=>{
    return (
      <ul>
        {personsToShow.map(person=> <li key={person.id}>{person.name} {person.number}<button onClick={()=>deleteName(person.id)}>Delete</button></li>)}
      </ul>
    );
}
export default Persons;