//Component Course
import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';


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