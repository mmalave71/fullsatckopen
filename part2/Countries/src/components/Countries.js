import React from 'react';
import DataCountry from './DataCountry';

const Countries=({countriesToShow,filtro,filtrarDesdeBoton})=>{

    if (filtro==='') {
       return(<></>);
    }
    else{
  
      if (countriesToShow.length > 10) {
        return (<p>To many matches,specify another filter</p>);
      } 
      else 
      {
        if (countriesToShow.length === 1) {
          const countryToShow = countriesToShow[0];
          return (<DataCountry countryToShow={countryToShow} />);
        }else {
          return (
            <ul>
              {countriesToShow.map(country =>
                <li key={country.name.common}>{country.name.common} <button onClick={() => filtrarDesdeBoton(country.name.common)}> Show</button></li>)}
            </ul>);
        }
      }//if (countriesToShow.length>10
  
    }// if (filtro==='')
  
  }//Countries
  export default Countries;
