import './Login.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import MountDisplay from '../../interface/tools/MountDisplay';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import googlelogo from '../../../media/images/googleicon.png'
import logo from '../../../media/images/ico.png';

const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: 'https://www.kagwave.com';

const Login = () => {

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({email: null, password: null});
  const [loginResponse, setLoginResponse] = useState();


  useEffect(() => {
    MountDisplay(undefined, 'Log In');
  }, []);

  const handleChange = (e) => {
    let label = e.target.id.replace('-login', '');
    let entry = e.target.value;
    setLoginInfo(prevState => ({
      ...prevState, [label]: entry
    }));
  }

  const handleKeyPress = (e) => {
    if (e.code === 'Enter') {
      login();
    }
  }

  const login = (e) => {
    if (!loginInfo.email || !loginInfo.password) {
      setLoginResponse('Missing credentials.')
    } else {
      axios({
        method: "POST", 
        url: `${serverUrl}/login/verify`, 
        data: loginInfo
      }).then((response)=> {
        console.log(response.data.status)
        let status = response.data.status;
        if (status === 'Success.') {
          let form = document.getElementById('login-form');
          form.submit();
        } else {
          setLoginResponse(status);
        }
      }).catch(err => { console.log(err); });
    }

  }

  return (
    <div id="page-content" style={{backgroundColor: '#a3e0e7'}}>
      <div className="login-pg fade-in">

        <img className="logo" style={{width: '100px', height: '100px', margin: '5px', cursor: 'pointer'}} 
          src={logo} alt="Kagwave™ Logo"
          onClick={() => navigate('/')}>
        </img>

      
        <div className="login-box">
          <div>
            <div className="group">
              <label className="email"></label>
              <input type="email" id="email-login" name="email" placeholder="Email" required autoComplete='off' autoFocus="autofocus"
                onChange={handleChange} onKeyPress={handleKeyPress} value={loginInfo.email ? loginInfo.email : ''}
              />
            </div>

            <div className="group">
              <label className="password"></label>
              <input type="password" id="password-login" name="password" placeholder="Password" required autoComplete='off'
                onChange={handleChange} onKeyPress={handleKeyPress} value={loginInfo.password ? loginInfo.password : ''}
              />
            </div>

            <div className="response">
              {loginResponse}
            </div>
            
            <button onClick={login} id='signin-btn' type="submit">
              Sign In
            </button>

            <form method="POST" id="login-form" action={`${serverUrl}/login/save`} style={{display: 'none'}}>
              <input type="password" id="password-login" name="password" placeholder="Password" required autoComplete='off'
                onChange={handleChange} onKeyPress={handleKeyPress} value={loginInfo.password ? loginInfo.password : ''}
              />
              <input type="email" id="email-login" name="email" placeholder="Email" required autoComplete='off' autoFocus="autofocus"
                onChange={handleChange} onKeyPress={handleKeyPress} value={loginInfo.email ? loginInfo.email : ''}
              />
            </form>

          </div>
            
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
