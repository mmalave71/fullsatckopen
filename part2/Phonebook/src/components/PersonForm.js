import React from 'react';

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
  export default PersonForm;
  