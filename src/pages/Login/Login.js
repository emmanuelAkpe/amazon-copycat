import React, { useState } from 'react'
import './Login.css';
import { Link } from 'react-router-dom'
// import AmazonLogo from '../../Amazon_Logo.png';
import {useSelector, useDispatch} from 'react-redux';
import { loginInitiate } from '../../redux/actions';
import {useEffect} from 'react';
import { useHistory } from 'react-router';

const Login = () => {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const {user} = useSelector((state) => state.data);
let dispatch = useDispatch();
let history = useHistory()
useEffect(()=>{
      if(user){
          history.push('/')
      }
}, [user, history])

   const signIn = (e) => {
       e.preventDefault();
       dispatch(loginInitiate(email, password));
       setEmail('');
       setPassword('');
   }
    return (
        <div className='login'>
          <Link to='/'>
              <img src="https://purepng.com/public/uploads/large/amazon-logo-s3f.png" className='login-logo' alt='logo'/>
          </Link>
          <div className='login-container'>
              <h1>Sign In</h1>
              <form>
                 <h5>E-mail</h5> 
                 <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                 <h5>Password</h5>   
                 <input
                    type='password'
                    value={password}
                    onChange={(e) =>  setPassword(e.target.value)}
                    />

                 <button type='submit' onClick={signIn} className='login-signIn'>
                     Sign In
                 </button>
              </form>

               <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
          </div>

          <p>New to amazon?</p>
          <Link to='/register'>
              <button className='login-register'>Create Your Amazon Account</button>
          </Link>
        </div>
    )
}

export default Login
