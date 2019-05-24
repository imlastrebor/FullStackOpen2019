import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

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
    const votes = []



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
                console.log(randomNumbers[randomNumber]),
               // console.log(randomNumbers),
                randomNumbers[randomNumber]
            )
    }

    
    const voteSystem =  () =>{
        
        let i
        let copy

        if (Array.isArray(votes) && votes.length < 1) {

            for (i = 0; i < anecdotes.length; i++) {
                votes.push(i)
            }
                votes.fill(0)
                copy = [...votes]
                copy[selected] = copy[selected] + 2
                return(
                    copy[selected],
                    console.log(votes),
                    console.log(copy),
                    console.log(copy[selected])
                )
        }

        else{
            return(
                copy = [...votes],
                copy[selected] = copy[selected] + 1,
                copy[selected],
                console.log(copy),
                console.log(copy[selected])
                // console.log(votes[selected]),
                // console.log(votes)
            )
        }
    }


    //Toimii melkein... kuitenkin nollaa arrayn
    // const voteSystem =  () =>{
        
    //     let i

    //     if (Array.isArray(votes) && votes.length < 1) {

    //         for (i = 0; i < anecdotes.length; i++) {
    //             votes.push(i)
    //         }
    //             votes.fill(0)
    //     }


    //     return(
    //         votes[selected] = votes[selected] + 1,
    //         votes[selected],
    //         console.log(votes),
    //         console.log(votes[selected])
    //     )
        
    // }

  return (
    <div>
      {props.anecdotes[selected]}
      <br/>
      <br/>
      <Button text="next anecdote" handleClick={randomAnecdote(randomTest)}/>
      <Button text="vote" handleClick={voteSystem}/>
    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


