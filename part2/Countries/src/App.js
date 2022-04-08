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
const Bandera=({bandera,online})=>{
      console.log(bandera);
      console.log(bandera.png);
      if (online){
          return (
             <>
             <img src={bandera.png} alt=''/>
             <p> url={bandera.png}</p>
             </>  
          )
      }else{
          return(
            <img src='./images/Impuesto2021.png' width='100px' height='100px' alt='impuesto'/>
          );
      }

      
};

const Wheather = ({city})=>{
 // Muestra el clima de una ciudad dada
const [temperature,setTemperature] =useState('');
const [wind,setWind]= useState('');
const [icono,setIcono]=useState('');


 const hookClima= ()=>{

     console.log('HookClima');
       const API_KEY= process.env.REACT_APP_API_KEY;
       console.log("API_KEY=",API_KEY);

      const params = {
          access_key: API_KEY,
          query: city
        }     
          console.log("params",params);

          
           
           axios.get('http://api.weatherstack.com/current', {params})
          .then(response => {
                  const apiResponse = response.data;
                  console.log("Data clima",response.data);
                  console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
                  console.log("wend_speed",apiResponse.current.wind_speed);
                  console.log("wend_dir",apiResponse.current.wind_dir);

                  setTemperature(apiResponse.current.temperature);
                  const varWind=apiResponse.current.wind_speed+" mph "+ apiResponse.current.wind_dir;

                  setWind(varWind);
                  setIcono(apiResponse.current.weather_icons[0]);

                })
          .catch(error => {
            console.log("Ha ocurrido el siguiente error:",error);
           });
           

};

/*
const hookClima2=()=>{
// Este Hook se usa cuando el sistema esta offline, para pruebas
  const tempCapitales ={Paris:2,Madrid:10,Bern:0.5, Rome :5, Caracas:23};
  console.log("city",city);
  const temperaturaLocal=tempCapitales[city];
  
  if (!temperaturaLocal) {
    console.log("Temp city",'Desconocido');
      setTemperature('Desconocido');
  }
  else {
    console.log("temp city",temperaturaLocal);
    setTemperature(temperaturaLocal);
  } 
}
*/
 
  useEffect(hookClima,[]);
  //useEffect(hookClima2,[]);
 

 console.log("Renderizando a Clima");

    return (
          <>
          <h3> Wheather in {city}</h3>
          <img src={icono} alt='icono del clima'></img>
          <p> Temperature:{temperature}℃  </p>
          <p> Wind: {wind}</p>
          </>
    );


}
const DataCountry=({countryToShow})=>{
// Muestra la informacion de un Pais
    return (
             <>
            <h2>{countryToShow.name.common}</h2>
            <p> Capital: {countryToShow.capital[0]}</p>
            <p> Poblacion: {countryToShow.population}</p>
            <h3>Languages</h3>
            <Languages  languages={countryToShow.languages} /> 
           <Bandera bandera={countryToShow.flags} online={true}/> 
           <Wheather city={countryToShow.capital[0]}/>
           <></>            
            </>);
}
const Countries=({countriesToShow,filtro,filtrarDesdeBoton})=>{


  if (filtro==='') {
     return(<></>);
  }
  else{

      if (countriesToShow.length>10){
        console.log("Mayor que 10");
         return (<p>To manu matches,specify another filter</p>);
      }else
      {

        if (countriesToShow.length===1){
           console.log("pais:",countriesToShow[0].name.common);
           const countryToShow=countriesToShow[0];
            return(

                <DataCountry countryToShow={countryToShow}/>
                
            );

        }
        else {
         return (
            <ul>
            {countriesToShow.map(country=> 
            
            <li key={country.name.common}>{country.name.common} <button onClick={()=>filtrarDesdeBoton(country.name.common)}> Show</button></li>)}
          </ul>);
        }
      }


  }


}

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
    const EnLinea=false;
    if (EnLinea){
      console.log("En linea");
      axios.get('https://restcountries.com/v3.1/all')
      .then( res => {
         console.log ("data:",res.data[0].name.common);
         setCountries(res.data); 
      })
      .catch(e=> console.log("Ha ocurrido el error:",e));   

    }
    else {
      console.log("Fuera de linea");
      axios.get('http://localhost:3001/countries')
      .then( res => {
         console.log ("data:",res.data[0].name.common);
         setCountries(res.data); 
      })
      .catch(e=> console.log("Ha ocurrido el error:",e));
    } 
  }
  useEffect(hookObtenerCountries,[]);



  
  const countriesToShow= (filtro===''? countries:countries.filter(country=>RegExp(filtro,"gi").test(country.name.common)));


  return (
    <div>
      <h2>Countries</h2>
      <Filter filtro={filtro} onChange={onChangeFiltro}/>
    
      <Countries countriesToShow={countriesToShow}filtro={filtro} filtrarDesdeBoton={filtrarDesdeBoton}/>
      
    </div>
  )
}

export default App;
