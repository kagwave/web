import './Login.css'
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import MountDisplay from '../../interface/tools/MountDisplay';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import googlelogo from '../../../media/images/googleicon.png'
import logo from '../../../media/images/ico.png';

import { serverUrl } from '../../../utils/urls';

const Login = () => {

  const navigate = useNavigate();
  const [loginResponse, setLoginResponse] = useState();

  useEffect(() => {
    MountDisplay(undefined, 'Log In');
    fetchLoginStatus();
  }, []);

  const fetchLoginStatus = () => {
    fetch(`${serverUrl}/login/status`, {credentials: 'include'})
    .then(response => {
      return response.json();
    })
    .then(data => {
      setLoginResponse(data.status);
      if (data.status) {
      //if (data.status === "Invalid password." || data.status === "Unknown user." || data.status === "Looks like there's an account associated with that email. Log in and connect it in your settings." || data.status === "You don't have a password yet. Try a method below and create one in your settings."){
        document.querySelector('.response').classList.remove('hide-element');
        document.querySelector('.response').classList.remove('hide-element');
        document.getElementById('signin-btn').style.margin = '2px 15px 15px 15px';
      } else {
        document.getElementById('signin-btn').style.margin = '15px';
      }
      if (data.status === "Login successful.") {
        navigate('/profile')
      }
    })
    .catch((error) => {
      console.log(error)
    }); 
  }

  return (
    <div id="page-content" style={{minHeight: '100vh', backgroundColor: '#a3e0e7'}}>

      <div className="login-pg fade-in">

        <img className="logo" style={{width: '100px', height: '100px', margin: '5px', cursor: 'pointer'}} 
          src={logo} alt="Kagwave™ Logo"
          onClick={() => navigate('/')}>
        </img>

      
        <div className="login-box">
          
          <form method="POST" action={`${serverUrl}/login`}>
            <div className="group">
              <label className="email"></label>
              <input type="email" id="email-login" name="email" placeholder="Email" required autoComplete='off' autoFocus="autofocus"/>
            </div>

            <div className="group">
              <label className="password"></label>
              <input type="password" id="password-login" name="password" placeholder="Password" required autoComplete='off'/>
            </div>

            <div className="response hide-element">
              {loginResponse}
            </div>
            
            <button id='signin-btn' type="submit">
              Sign In
            </button>

          </form>
            
          {/*<div className="sign-in-options">
          <div className="or-seperator">
            <div id="seperator" style={{width: '5vw', height: '2px', margin: '10px 5px 10px 0'}}></div>
            <p style={{fontSize: '15px', color: 'black'}}>or</p>
            <div id="seperator" style={{width: '5vw', height: '2px', margin: '10px 0 10px 5px'}}></div>
          </div>

            <a 
              href={`${serverUrl}/auth/facebook`} 
              id="fb-sign-in" className="alt-sign-in" style={{width: '20%', minWidth: '130px', fontSize: '14px'}} >
              Continue with <FontAwesomeIcon icon={faFacebook} size="lg" style={{color: 'white', paddingLeft: '5px'}}/>
            </a>
            <a 
              href={`${serverUrl}/auth/google`} 
              id="google-sign-in" className="alt-sign-in" style={{width: '20%', minWidth: '130px', fontSize: '14px'}}>
              Continue with <img width='18px' src={googlelogo} style={{paddingLeft: '5px'}}/>
            </a>
            <a 
              href={`${serverUrl}/auth/apple`} 
              id="apple-sign-in" className="alt-sign-in" style={{width: '20%', minWidth: '130px', fontSize: '14px'}}>
              Continue with <FontAwesomeIcon icon={faApple} size="lg" style={{color: 'white', paddingLeft: '5px'}}/>
            </a>
          </div>

          <div style={{margin: '10px'}}>
            <NavLink to="/signup" style={{textDecoration: 'none', fontFamily: "Questrial", fontSize:'calc(10px + 0.3vw)'}}>
              Don't have an account? Create one.
            </NavLink>
          </div>*/}

        </div>
      </div>
    </div>
  );

}

export default Login;
