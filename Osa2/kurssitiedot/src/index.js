import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {

    return (
      <div>
        <h1>
          {props.header}
        </h1>
      </div>
    )
  }

const Part = ({part}) =>{
    return(
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Content = ({course}) => {

    const part = () => course.map(part => {
        return(
            <Part 
                key={part.id}
                part={part}
            /> 
        )
    })
    
    return(
        <div>
            {part()}
        </div>
    )
}
const Total = ({course}) => {

    const totalCount = () => course.map(part => {
    return    part.exercises
    }).reduce((total, amount) =>{
        return  total + amount
    })
    return(
        <div>
           <p>yhteensä {totalCount()} kurssia</p>
        </div>
    )
    
}

const Course = ({course}) => {

    return(
        <div>
            <Header header={course.name}/>
            <Content course={course.parts}/>
            <Total course={course.parts}/> 
        </div>
    )
}

const App = () => {



    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    }
    return (
      <div>
        <Course course={course}/>
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));
