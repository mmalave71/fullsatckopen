//Countries
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const Filter = ({filtro,onChange})=>{
  return(
          <>
          find countries: <input type="text" value={filtro} onChange={onChange} />
          <br/>
          </>
      );
}

const Languages= ({languages})=>{
      const claves=Object.keys(languages);

  return (
    <ul>
      {claves.map(clave => <li key={clave}> {languages[clave]} </li >)}
    </ul>
  );
};
const Bandera=({bandera})=>{
          return (
             <>
             <img src={bandera.png} alt=''/>
             <p> url={bandera.png}</p>
             </>  
          );
};

const Wheather = ({city})=>{
 // Muestra el clima de una ciudad dada
const [temperature,setTemperature] =useState('');
const [wind,setWind]= useState('');
const [icono,setIcono]=useState('');

 const hookClima= ()=>{
       const API_KEY= process.env.REACT_APP_API_KEY;
       const params = {
          access_key: API_KEY,
          query: city
        }           
        axios.get('http://api.weatherstack.com/current', {params})
          .then(response => {
                  const apiResponse = response.data;
                  setTemperature(apiResponse.current.temperature);
                  const varWind=apiResponse.current.wind_speed+" mph "+ apiResponse.current.wind_dir;
                  setWind(varWind);
                  setIcono(apiResponse.current.weather_icons[0]);
                })
          .catch(error => {
            console.log("Ha ocurrido el siguiente error:",error);
           });
           

};//hook Clima

 useEffect(hookClima,[]);  
  return (
    <>
      <h3> Wheather in {city}</h3>
      <img src={icono} alt='icono del clima'></img>
      <p> Temperature:{temperature}℃  </p>
      <p> Wind: {wind}</p>
    </>
  );

}//Wheather

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