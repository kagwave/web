import './Header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../media/images/ico.png';
import banner from '../../media/images/banner-text-logo.png';

import { serverUrl } from '../../utils/urls';

const Header = (props: any) => {

  const history = useHistory();

  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  
  const [logoBtnInfo, setlogoBtnInfo] = useState({text: ''});
  const [accountHeader, setAccountHeader] = useState<any>();

  useEffect(() => {
    changeBtnText();
    if (isLoggedIn) {
      fetchHeader();
    }
  }, [user]);

  const fetchHeader = () => {
    axios({
      method: "POST", 
      url: `${serverUrl}/account/header`, 
      data: user
    }).then((response)=>{
      setAccountHeader(response.data);
    }).catch(err => { console.log(err); });
  }

  const changeBtnText = () => {
    if (isLoggedIn){
      setlogoBtnInfo({text: 'Logout'});
    } else {
      setlogoBtnInfo({text: 'Login'});
    }
  }

  const logInOut = () => {
    if (!isLoggedIn){
      history.push('/login');
    } else if (isLoggedIn){
      window.open(`${serverUrl}/logout`, '_self');
    }
  }

  const showUser = () => {
    if (isLoggedIn) {
      return (
        <div className="user-info">
          <div style={{textAlign: 'right'}}>
            <span style={{fontFamily: 'Aspergit', fontStyle: 'bold', fontSize: '16px', cursor: 'pointer'}} onClick={() => history.push('/me')}>
              {accountHeader ? accountHeader.display_name : null}   
            </span>
            <span>  </span>
            <button onClick={() => history.push('/me')}
              style={{color: '#6b8d92', position: 'relative', padding: '3px', marginRight: '0'}}>
                <img src={accountHeader ? accountHeader.profile_photo : null} alt={accountHeader ? accountHeader.display_name : null} width="40px" height="40px"></img>
            </button>
          </div>
          
          <div id="useremail" onClick={() => history.push('/me')}>
            {accountHeader ? accountHeader.email : null}
          </div>
        </div>
      );
    }
  }

  return ( 
    <div className="header-bar">

      {/*<AudioPlayer tracks={tracks}/>*/}
    
      <div className="banner-container">
        <img src={banner} style={{border: 'none', padding: '10px', height: '80px'}} alt="KΛGWΣ"/>
      </div>

      <div className="user-panel">
        <div>{showUser()}</div>
      </div>

      <div style={{position:'absolute', display: 'flex', flexDirection: 'column', top:'20px', right: '20px'}}>

        <img className="logo"
          src={logo} alt="Kagwave™ Logo"
          onClick={() => {return}} 
          //onMouseEnter={() => {changeBtnText(); document.querySelector('.logo-btn-info').style.visibility = 'visible'}}
          //onMouseLeave={() => {changeBtnText(); document.querySelector('.logo-btn-info').style.visibility = 'hidden'}}
        ></img>

        <div className='logo-btn-info' style={{display: 'none'}}>
          {logoBtnInfo.text}
        </div>

      </div>

    </div>
  );
}

export default Header;