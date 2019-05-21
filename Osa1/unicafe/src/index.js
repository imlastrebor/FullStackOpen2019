import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({headerText}) => {
    return(
        <h1>{headerText}</h1>
    )
}

const Button = ({handleClick, text}) =>(

    <button onClick={handleClick}> 
        {text}
    </button>

)

const Statistics = ({text, value}) => {
    return(
        <div>
            <p>{text} {value}</p>
        </div>
    )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setTotal(good + neutral + bad + 1)
    setAvg(((good + 1) + (-1 * bad)) / (total + 1))
    setPositive(((good + 1) / (total + 1)) * 100 + '%')  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(good + neutral + bad + 1)
    setPositive(((good) / (total + 1)) * 100 + '%')  
    setAvg((good + (-1 * bad)) / (total + 1))
}

  const handleClickBad = () => {
    setBad(bad + 1)
    setTotal(good + neutral + bad + 1)
    setPositive(((good) / (total + 1)) * 100 + '%')
    setAvg((good + (-1 * (bad + 1 ))) / (total + 1))
  }

  return (
    <div>
    <Header headerText="Anna palautetta"/>
    <Button 
        handleClick={handleClickGood}
        text="Good"
    />
        <Button 
        handleClick={handleClickNeutral}
        text="Neutral"
    />
        <Button 
        handleClick={handleClickBad}
        text="Bad"
    />
    <Header headerText="statistiikka" />
    <Statistics text="hyvä" value={good}/>
    <Statistics text="neutraali" value={neutral}/>
    <Statistics text="huono" value={bad}/>
    <Statistics text="yhteensä" value={total}/>
    <Statistics text="keskiarvo" value={avg}/>
    <Statistics text="positiivista" value={positive}/>



    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)