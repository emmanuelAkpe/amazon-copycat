import React, {useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {useDispatch} from 'react-redux'
import {auth} from './utils/firebase';
import { setuser } from './redux/actions';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import {loadStripe}  from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KHhuXC5ef00LzuA26Gqfnec0ZfNzEGFJIxLJVsDDKHPZlvbDxYOCHbtM4L1OUkKaaMDSb7TIYyhUcy9BOuN5Axb00Wkfd30Cy');


// a user remains login even when the web page is refreshed.
function App() {
  let dispatch =useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(setuser(authUser));
      }
      else{
        dispatch(setuser(null));
      }
    })
    
  }, [dispatch])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Header/>
            <Home/>
          </Route>
          
        <Route path='/login'>
          <Login/>
          
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>

          <Route path='/product/:id'>
            <Header/>
            <SingleProduct/>
          </Route>

          <Route path='/checkout'>
            <Header/>
            <Checkout/>
          </Route>

          <Route path="/payment">
                  <Header/>
                  <Elements stripe={promise}>
                    <Payment/>
                  </Elements>
                </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
