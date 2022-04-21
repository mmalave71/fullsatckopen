import  React,{useState,useEffect} from 'react';
import axios from 'axios';

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
export default Wheather;