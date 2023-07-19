import React from 'react';
import { SuggestionBox } from './components/SuggestionBox';

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="search-container">
        <SuggestionBox />
      </div>
    </div>
  );
}

export default App;
