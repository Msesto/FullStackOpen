import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((prev, curr) => {return (prev += curr.exercises)}, 0)
    return(
      <strong>Number of exercises {sum}</strong>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map((part, i) => <Part key={part.id} part={course.parts[i]}></Part>)}
      </div>
    )
  }
  
  const Course = (course) => {
    return (
      <div>
        <Header course={course.course} />
        <Content course={course.course} />
        <Total course={course.course} />
      </div>
  )}

  export default Course;