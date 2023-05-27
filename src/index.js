import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function Demo() {
  return(
    <div className='hello'>
      <h1>Hello World!</h1>
      <BlockChain title = "Blockchain with React is good" language = "solidity"/>
      <BlockChain title = "Will Learn solidity" language = "solidity"/>
    </div>
  );
}

const BlockChain = (props) => {
  return (
    <article>
      <h2>{props.title}</h2>
      <h3>Language is {props.language}</h3>
    </article>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Demo/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
