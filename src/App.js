import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {toast} from 'react-toastify'
import BuyPage from './Buy';


function App() {

  const [cartItem, setCartItem] = useState({});

  const addInCart = item => {
    const isAlreadyAdded = cartItem.findIndex(function (array) {
      return array.id === item.id;
    })

    if(isAlreadyAdded !== -1) {
      toast("Already added in cart", {
        type: 'error'
      })
    }
    setCartItem([...cartItem, item])
  }

  const buyNow = () => {
    setCartItem([])
    toast("Purchase Done", {
      type: 'success'
    })
  }

  const reomveItem = item => {
    setCartItem(cartItem.filter(singletItem => singletItem.id !== item.id))
  }

  return (
    <div className='App'>
      <BuyPage/>
    </div>
  );
}

export default App;
