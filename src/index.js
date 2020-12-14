import React from 'react';
import ReactDOM from 'react-dom';

import SecondTimer from './components/SecondTimer.jsx';
import './css/styles.css';

function App() {
  return (
    <div className="">
      <SecondTimer />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
