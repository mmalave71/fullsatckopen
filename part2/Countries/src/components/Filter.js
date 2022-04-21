import React from 'react';

const Filter = ({filtro,onChange})=>{
    return(
            <>
            find countries: <input type="text" value={filtro} onChange={onChange} />
            <br/>
            </>
        );
  }
  export default Filter;