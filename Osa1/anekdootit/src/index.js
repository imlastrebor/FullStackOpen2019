import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Votes = ({votes}) => {

    return(
        <div>
            <p>has {votes} votes</p>
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
  ]




const App = (props) => {

    const [selected, setSelected] = useState(0)
    const [votesCount, setVotesCount] = useState([])


    const randomAnecdote = (random) => {

        return () => {
            setSelected(random)
        }
    }

    const randomTest = () => {
        //create random number
        const randomNumber = Math.floor(Math.random() * 6)
        //create empty array
        const randomNumbers = []
        //variable for for loop
        let i
        //for loop checks anecdotes array lenght and push as many numbers to randomNumbers
        for (i = 0; i < anecdotes.length; i++) {
            randomNumbers.push(i)
        }

            return (
                randomNumbers[randomNumber]
            )
    }
    const voteSystem = () => {
        let i
        if (votesCount.length < 1) {
            
            for (i = 0; i < anecdotes.length; i++) {
                votesCount.push(0)
            }

        }
        votesCount[selected] += 1
            setVotesCount([
            
            ...votesCount,
        ])

    }
    console.log(votesCount)


  return (
    <div>
      {props.anecdotes[selected]}
      <Votes votes={votesCount[selected]} />
      <Button text="next anecdote" handleClick={randomAnecdote(randomTest)}/>
      <Button text="vote" handleClick={voteSystem}/>


    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


