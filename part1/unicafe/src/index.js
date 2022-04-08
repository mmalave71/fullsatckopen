import React,{useState} from 'react';
import ReactDOM from 'react-dom';


const Boton=({handleClick,text})=>{

   return (
      <button onClick={handleClick}> {text} </button>

   );

}

const Statistic =(props)=>{
  
    return(
      <>
      <td>{props.texto}</td><td>{props.valor}</td>
      </>
    );
}
const Statistics =({good,neutral,bad})=>{


  const promedio= (good,neutral,bad)=>{

        
        let promedio=(good+neutral+bad)/3;
        promedio =Math.round(promedio*100)/100;
        return(promedio);
  }

  const positivos=(good,neutral,bad)=>{
    const total=good+neutral+bad;
    if (total===0) return("0%");
    let resultado=good/total*100;
    resultado=Math.round(resultado*100)/100; //redonderalo a  2 digitos
    return ( resultado.toString()+"%") ;
      
  }


  if (good+neutral+bad===0){

      return (
        <>
        <h1>Statistics</h1>
        <p> No feedback given</p>
        </>
      );


  }

  return (
   <>
  <h1>Statistics</h1>
  <table border="1px">
  <tbody>
    <tr>  
    <Statistic texto="Good" valor={good}/>
    </tr>
    <tr>  
    <Statistic texto="Neutral" valor={neutral}/>
    </tr>
    <tr>  
    <Statistic texto="Bad" valor={bad}/>
    </tr>
    <tr>  
    <Statistic texto="All" valor={good+neutral+bad}/>
    </tr>
    <tr>  
    <Statistic texto="Average" valor={promedio(good,neutral,bad)}/>
    </tr>
    <tr>  
    <Statistic texto="Positive" valor={positivos(good,neutral,bad)} />
    </tr>
  </tbody>
  </table>
  </>
  );

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood =()=>{
        console.log('HandleGood');
        setGood(good+1);
  };

  const handleNeutral =()=>{
    console.log('HandleNeutral');
    setNeutral(neutral+1);
};
const handleBad=()=>{
    setBad(bad+1);
};


  return (
    <div>
      <h1>Give FeedBack</h1>
      <Boton handleClick={handleGood} text="good"/>
      <Boton handleClick={handleNeutral} text="neutral" />
      <Boton handleClick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}





ReactDOM.render (<App/>,document.getElementById('root'));






