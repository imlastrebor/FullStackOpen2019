
import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({header}) =>{

    return(
        <div>
            <h1>
                {header}
            </h1>
        </div>
    )
}

const Part = ({part, header}) => {

    return(
      <div>
        <p> 
          {part.name}
        </p>
      </div>
)
}

const Content = ({course}) => {

  const header = () => course.map(header => {
    return(
        <Header 
            key={header.id}
            header={header.name}
        /> 
    )
})



    const part = () => course.map((title) => {
      return(
      title.parts.map((partname) => {
        return(
            <Part 
                key={partname.id}
                part={partname}
            /> 
        )
      })
      )
    })

  return(
      <div>
          {header()}
          {part()}
      </div>
  )
}

const Total = ({course}) => {


  const totalCount = () => course.map((testi) => {
    return(
    testi.parts.map((testi1) => {
      console.log(testi1)
      return    testi1.exercises
    }).reduce((total, amount) =>{
      return  total + amount
  })
    )
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
            <Header header={'Opetusohjelma'} />
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}



const App = () => {

  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
    
  ]

    return (
      <div>
        <Course course={courses}/>
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));


  // const courses = [
  //   {
  //     name: 'Half Stack -sovelluskehitys',
  //     id: 1,
  //     parts: [
  //       {
  //         name: 'Reactin perusteet',
  //         exercises: 10,
  //         id: 1
  //       },
  //       {
  //         name: 'Tiedonvälitys propseilla',
  //         exercises: 7,
  //         id: 2
  //       },
  //       {
  //         name: 'Komponenttien tila',
  //         exercises: 14,
  //         id: 3
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Node.js',
  //     id: 2,
  //     parts: [
  //       {
  //         name: 'Routing',
  //         exercises: 3,
  //         id: 1
  //       },
  //       {
  //         name: 'Middlewaret',
  //         exercises: 7,
  //         id: 2
  //       }
  //     ]
  //   }
  // ]
