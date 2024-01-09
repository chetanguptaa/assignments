import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

function findFactorial(n, map = new Map()) {
  if (n === 0 || n === 1) return 1;
  if (map.has(n)) return map.get(n);

  map.set(n, n * findFactorial(n - 1));
  return map.get(n);
}

function Assignment1() {
  const [input, setInput] = useState(0);
  const [counter, setCounter] = useState(0);
  // Your solution starts here

  const expensiveValue = useMemo(() => {
    console.log("Hi there");
    findFactorial(input);
  }, [input]);

  // Your solution ends here

  return (
    <div>
      <div>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
        <p>Calculated Value: {expensiveValue}</p>
      </div>
      <div>
        <button onClick={() => setCounter(counter + 1)}>
          counter {counter}
        </button>
      </div>
    </div>
  );
}

export default Assignment1;
