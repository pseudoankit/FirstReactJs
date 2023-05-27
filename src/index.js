import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function Demo() {
  return(
    <div className='hello'>
       <h1>Hello World!</h1>
       <BlockChain/>
    </div>
  );
}

const BlockChain = () => {
  return <h2>Blockchain with React is good</h2>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Demo/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
