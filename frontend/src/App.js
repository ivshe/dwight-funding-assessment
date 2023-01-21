import React, { useEffect, useState } from 'react';
import './App.css';


const App = () => {
  const [result, setResult] = useState(null)
  const [options, setOptions] = useState([[
    "USD", 
    "United States Dollar",
  ]]);

  const hadleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`http://localhost:3001/exchange`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: evt.target.amount.value,
        sourceCurrency: evt.target.sourceCurrency.value,
        targetCurrency: evt.target.targetCurrency.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3001/codes`)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((err) => {
        console.error(err);
      });
   }, []);


  return (
    <div className="App">
      <h1>Dwight Funding Assesment</h1>
      <h3>Currency converter</h3>
      <form onSubmit={hadleSubmit}>
        <label>
          Amount:
          <input type="number" name="amount" />
        </label>
        <label>
          Source currency:
          <select name="sourceCurrency" defaultValue="USD">
            {options.map(([key, title]) => (
              <option key={key} value={key}>{key} ({title})</option>
            ))}
          </select>
        </label>
        <label>
          Target currency:
          <select name="targetCurrency" defaultValue="USD">
            {options.map(([key, title]) => (
              <option key={key} value={key}>{key} ({title})</option>
            ))}
          </select> 
        </label>
        <button type="submit">Calculate</button>        
      </form>
      {result && <h3>result: {result}</h3>}
    </div>
  );
}

export default App;
