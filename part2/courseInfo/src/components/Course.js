//Componet Course
import React from 'react';

const Header =({titulo})=>{
    return (<h2>{titulo}</h2>);
};

const Content =({parts})=>{
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>
  );
};

const Part =({part,exercises})=>{
  return (
    <p>
      {part} {exercises}
    </p>
  );
};
const Total = ({parts})=>{
  return (
    <h3>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises </h3>
  );
};

const Course =({course})=>{
  return (
    <>
      <Header titulo={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;