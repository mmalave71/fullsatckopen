
import React from 'react';
import Languages from './Languages';
import Bandera from './Bandera';
import Wheather from './Wheather';

const DataCountry=({countryToShow})=>{
    // Muestra la informacion de un Pais
      return (
        <>
          <h2>{countryToShow.name.common}</h2>
          <p> Capital: {countryToShow.capital[0]}</p>
          <p> Poblacion: {countryToShow.population}</p>
          <h3>Languages</h3>
          <Languages languages={countryToShow.languages} />
          <Bandera bandera={countryToShow.flags} />
          <Wheather city={countryToShow.capital[0]} />
        </>);
    }//DataCountry
export default DataCountry;