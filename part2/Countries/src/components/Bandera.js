import React from 'react';

const Bandera=({bandera})=>{
    return (
       <>
       <img src={bandera.png} alt=''/>
       <p> url={bandera.png}</p>
       </>  
    );
};
export default Bandera;