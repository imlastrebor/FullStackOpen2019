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



const Statistic = ({text, value}) => {
    return(
            <tr>
                <td> {text} </td>
                <td> {value} </td>
            </tr>
    )
}

const Statistics = (props) => {

    if (props.valueTotal < 1) {
        return(
            <p>Ei yhtään palautetta</p>
        )
    }

    return(
        <div>
            <Header headerText="statistiikka"/>
            <table>
                <tbody>
                    <Statistic text="hyvä" value={props.valueGood}/>
                    <Statistic text="neutraali" value={props.valueNeutral}/>
                    <Statistic text="huono" value={props.valueBad}/>
                    <Statistic text="yhteensä" value={props.valueTotal}/>
                    <Statistic text="keskiarvo" value={props.valueAvg}/>
                    <Statistic text="positiivista" value={props.valuePositive}/>
                </tbody>
            </table>
        </div>
    )

}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    // const [total, setTotal] = useState(0)
    // const [avg, setAvg] = useState(0)
    // const [positive, setPositive] = useState(0)

    const total = good + bad + neutral
    const avg = ((good) + (-1 * bad)) / (total)
    const positive = ((good) / (total)) * 100 + '%'

    const handleClickGood = () => {
        setGood(good + 1)
        // setTotal(good + neutral + bad + 1)
        // setAvg(((good + 1) + (-1 * bad)) / (total + 1))
        // setPositive(((good + 1) / (total + 1)) * 100 + '%')
    }

    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
        // setTotal(good + neutral + bad + 1)
        // setPositive(((good) / (total + 1)) * 100 + '%')  
        // setAvg((good + (-1 * bad)) / (total + 1))
    }

    const handleClickBad = () => {
        setBad(bad + 1)
        // setTotal(good + neutral + bad + 1)
        // setPositive(((good) / (total + 1)) * 100 + '%')
        // setAvg((good + (-1 * (bad + 1 ))) / (total + 1))
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
                <Statistics
                    valueGood={good} 
                    valueNeutral={neutral}
                    valueBad={bad}
                    valueAvg={avg}
                    valuePositive={positive}
                    valueTotal={total}
                />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)