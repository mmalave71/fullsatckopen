import React from 'react';

const Filter = ({filtro,onChange})=>{
    return (
      <>
        filter show as: <input type="text" value={filtro} onChange={onChange} />
        <br />
      </>
    );
  }

  export default Filter;