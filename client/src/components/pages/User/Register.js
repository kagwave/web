import './Register.css'
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

import googlelogo from '../../../media/images/googleicon.png'
import logo from '../../../media/images/ico.png';

const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: 'https://www.kagwave.com';

const Register = () => {

  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    first_name:'', 
    last_name: '',
    email: '', 
    password: ''
  });
  const[registerResponse, setRegisterResponse] = useState(null);

  useEffect(() => {
    document.title = 'Sign Up';
    document.querySelector("link[rel='icon']").href = "favicon.ico" ;
    var registerpg = document.getElementById('page-content');
    registerpg.style.display = "flex";
    registerpg.style.flexDirection = "row";
    registerpg.style.alignItems = "center";
    registerpg.style.justifyContent = "center";
    if (document.querySelector('.navbar') !== null){
      var header = document.querySelector('.header-bar');
      var navbar = document.querySelector('.navbar');
      header.style.display = 'none';
      navbar.style.display = 'none';
    }
  }, []);

  const handleChange = (e) => {
    let label = e.target.id;
    let entry = e.target.value;
    setRegisterInfo((prevState) => ({
      ...prevState,
      [label]: entry
    }));
  }

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(registerInfo);

    axios({
      method: "POST", 
      url: `${serverUrl}/signup`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: registerInfo
    }).then((response)=> {
      console.log(response.data)
      if (response.data !== null && response.data !== 'Successful sign up.') {
        setRegisterResponse(response.data);
        document.querySelector('.response').classList.remove('hide-element');
        document.querySelector('.response').classList.remove('hide-element');
        document.getElementById('signup-btn').style.margin = '2px 15px 15px 15px';
      } else {
        document.getElementById('signup-btn').style.margin = '15px';
        navigate('/login');
      }
    }).catch((error) => {
      console.log(error);
    })
  }

    return (
      <div id="page-content" style={{backgroundColor: '#a3e0e7'}}>
        <div className="register-pg fade-in">

          <div className="register-container">

            <div className="register-desc">
              <img className="register-logo"
                src={logo} alt="Kagwave™ Logo"
                onClick={() => navigate('/')}
              ></img>
              <div className="register-title">
                <h1>Get on the wave.</h1>
                <h2>Join and start connecting with the world in a new way.</h2>
              </div>
            </div>
            

            <div className="register-form">
              <div>
                <h1>Create Your Account</h1>
              </div>

              <form onSubmit={formSubmit}>

                <div className="info-group">
                  <label className="userInfo"></label>
                  <input type="name" onChange={handleChange} id="first_name" name="first_name" placeholder="First Name" required
                    pattern="^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$"
                    title= "No special characters allowed."
                  />
                  <input type="name" onChange={handleChange} id="last_name" name="last_name" placeholder="Last Name" required
                    pattern="^([a-zA-Z]+?)([-\s'][a-zA-Z]+)*?$"
                    title= "No special characters allowed."
                  />
                </div>
                
                <div className="info-group">
                  <label className="userEmail"></label>
                  <input type="email" onChange={handleChange} id="email" name="email" placeholder="Email" required
                    pattern="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$" 
                    title="example@provider.com"
                  />
                </div>

                <div className="info-group">
                  <label className="userPassword"></label>
                  <input type="password" onChange={handleChange} id="password" name="password" placeholder="Password" required
                    pattern="[0-9a-zA-Z]{6,}"
                    title="Minimum 6 characters."
                  />
                </div>

                <div className="response hide-element">
                  {registerResponse}
                </div>
                
                <div>
                  <button type="submit" 
                  id="signup-btn" style={{backgroundColor: '#51bd3c'}}
                  //onClick={handleSubmit}
                  >Sign Up</button>
                </div>
              </form>

              <div className="sign-in-options">
                <a href={`${serverUrl}/auth/facebook`} //onClick={() => watchResult('facebook')} 
                  id="fb-sign-in">
                  Sign Up with <FontAwesomeIcon icon={faFacebook} size="lg" style={{color: 'white', paddingLeft: '5px'}}/>
                </a>
                <a href={`${serverUrl}/auth/google`} id="google-sign-in">
                  Sign Up with <img width='20px' src={googlelogo} alt="Sign Up With Google" style={{paddingLeft: '5px'}}/>
                </a>
              </div>

              <div style={{margin: '10px'}}>
                <NavLink to="/login" style={{textDecoration: 'none', fontFamily: "Questrial"}}>
                  Already have an account? Log in. 
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register;
