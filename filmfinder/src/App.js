import React, {useState, useEffect} from 'react';

import './App.css';

function App() {
  const [initialData, setInitialData] = useState([{}])

  useEffect(() => {
    fetch('/app').then(
      response => response.json()
    ).then(data => setInitialData(data))
  });
  return (
    <div className="App">
      <h1>{initialData.title}</h1>
      <br/>
      <h2>{initialData.message}</h2>
    </div>
  );
}

export default App;
