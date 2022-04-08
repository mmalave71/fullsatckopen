import React,{useState} from 'react';
import ReactDOM from 'react-dom';


const Boton = (props)=>{

  return (
    <button onClick={props.handleClick}> {props.text}</button>
  );

};

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points,setPoints] =useState({0:0,1:0,2:0,3:0,4:0,5:0});
 

  const handleAnecdote=()=>{

   let newSelected=Math.round(Math.random()*5);
   console.log('newSelected',newSelected);
   setSelected(newSelected);
      
  };

  const handleVotes=()=>{

    const  newPoints={...points, [selected]:points[selected]+1};
    setPoints(newPoints);
    console.log("points",points);
    console.log("newPoits",newPoints);
    console.log("points[selected]",points[selected]);


  };
  const buscarMasVotada= ()=>{

   
      
    const claves=Object.keys(points);

    console.log ("Claves",Object.keys(points))
    let maximo=0;
    let claveconMaximo=0;
    for (let clave of claves)
    {
        console.log("clave",clave);
        console.log("votes",points[clave]);
        if (points[clave]>maximo){
              maximo=points[clave];
              claveconMaximo=clave;
        }
    }

      return(claveconMaximo);
  };
  const masVotada=buscarMasVotada();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} 
      <br/>
        Has {points[selected]} votes
      <br/>
       <br/>
       
      <br/>
       <Boton handleClick={handleVotes} text="vote"/>
       <Boton handleClick={handleAnecdote} text="next anecdote"/>
       <br/>
       <h1>Anecdote with most votes</h1>
       {props.anecdotes[masVotada]} 
       <br/>
        Has {points[masVotada]} votes
       
        
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];


ReactDOM.render (<App anecdotes={anecdotes} />,document.getElementById('root'));






