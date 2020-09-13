import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [hello, setHello] = useState([]);

  async function fetchData() {
    let response = await fetch("http://localhost:5000/hello");
    response.json()
      .then(response => setHello(response));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <header className="App-header">
        {hello.hello}
      </header>
    </div>
  );
}

export default App;
