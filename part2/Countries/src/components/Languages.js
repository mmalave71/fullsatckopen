import React from 'react';

const Languages= ({languages})=>{
    const claves=Object.keys(languages);

return (
  <ul>
    {claves.map(clave => <li key={clave}> {languages[clave]} </li >)}
  </ul>
);
};
export default Languages;
