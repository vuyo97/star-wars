import React from 'react';
import Home from './pages/Home'
import FadeIn from 'react-fade-in';

function App() {
  return (
    <div className="App w3-container" id="App">
      <FadeIn >
        <Home />
      </FadeIn>
    </div>
  )
}

export default App;
