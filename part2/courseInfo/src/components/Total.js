import React from 'react';

const Total = ({parts})=>{
    return (
      <h3>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises </h3>
    );
  };
  export default Total;
