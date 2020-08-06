import React from 'react';
import './App.css';
import Button from '../components/Button';

function App() {
  const handleCreateEventClick = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button
          onClick={handleCreateEventClick}
          text="Create Event"
          type="open"
          icon="plus"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
