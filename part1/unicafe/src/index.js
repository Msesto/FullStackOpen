import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Buttons = ({setGood, setBad, setNeutral, good, bad, neutral}) => {
  return (
    <div>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setGood(good + 1)}>Good</button>
    </div>
  )
  }  

const Statistics = ({text, value}) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}  

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Give Feedback</h3>
      <Buttons setBad={setBad} setGood={setGood} setNeutral={setNeutral} bad={bad} good={good} neutral={neutral}></Buttons>
      <table>
        <tbody>
          <Statistics text='Bad: ' value={bad}></Statistics>
          <Statistics text='Neutral: ' value={neutral}></Statistics>
          <Statistics text='Good: ' value={good}></Statistics>
          <Statistics text='All: ' value={good + neutral + bad}></Statistics>
          <Statistics text='Average: ' value={((good - bad)/(good + neutral + bad)) || 0}></Statistics>
          <Statistics text='Positivity rate: ' value={((100/(good + neutral + bad)) * good)+'%'}></Statistics>
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)