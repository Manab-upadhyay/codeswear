
"use client"
import  { useState } from 'react';

function CounterButton() {
    
  // Define state variable count and its setter function setCount
  const [count, setCount] = useState(0);

  // Function to increment count when button is clicked
  const incrementCount = () => {
    console.log("i got clicked")
    setCount(count + 1);
  };

  return (
    <div>
      {/* Display current count */}
      <p>Count: {count}</p>
      
      {/* Button to increment count */}
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}

export default CounterButton;
