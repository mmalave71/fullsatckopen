//Countries
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filtro,setFiltro]=useState('');

  const onChangeFiltro=(e)=>{
      setFiltro(e.target.value);
  };

  const filtrarDesdeBoton=(nombrePais)=>{
      setFiltro(nombrePais);
  }

  const hookObtenerCountries =()=>{
      axios.get('https://restcountries.com/v3.1/all')
      .then( res => {
         setCountries(res.data); 
      })
      .catch(e=> console.log("Ha ocurrido el error:",e));   
  }

  useEffect(hookObtenerCountries,[]);
  const countriesToShow= (filtro===''? countries:countries.filter(country=>RegExp(filtro,"gi").test(country.name.common)));

  return (
    <div>
      <h2>Countries</h2>
      <Filter filtro={filtro} onChange={onChangeFiltro} />
      <Countries countriesToShow={countriesToShow} filtro={filtro} filtrarDesdeBoton={filtrarDesdeBoton} />
    </div>
  );
}// App

export default App;