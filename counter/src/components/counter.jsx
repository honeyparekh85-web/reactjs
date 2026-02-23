import React, { useState } from 'react'

const Counter = () => {
  let [count, setcount] = useState(0)

  const increment = () => {
    setcount(count + 1)
  }

  const decrement = () => {
    setcount(count - 1)
    if (count <= 0) {
      setcount(0)
    }
  }

  const restart = () => {
    setcount(0)
  }

  return (
    <>
      <h1>Counting numbers app~</h1>

      <div className="count-display">
        <p className="count">{count}</p>
      </div>

      <div className="buttons">
        <button className="btn minus" onClick={decrement}>−</button>
        <button className="btn restart" onClick={restart}>Reset</button>
        <button className="btn plus" onClick={increment}>+</button>
      </div>
    </>
  )
}

export default Counter
