import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    console.log(props, props.course.parts[0].name)
    return (
      <div>
        <p>
          {props.course.name}
        </p>
      </div>
    )
  }
const Part = (props) =>{
    return(
        <div>
            {props.part} {props.exercises}
        </div>
    )
}

const Content = (props) => {
    
    return(
        <div>
            <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
            <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
            <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
        </div>
    )
}
const Total = (props) => {

       const totalCount = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises

    return(
        <div>
          <p>yhteensä {totalCount} tehtävää</p>
        </div>
    )
    
}

const App = () => {
    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },
        {
          name: 'Komponenttien tila',
          exercises: 14
        }
      ]
    }
  
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course} />
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));
