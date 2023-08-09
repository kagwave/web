import axios from 'axios';
import { useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faTwitter, faInstagram, faSpotify, faFacebookSquare, faLinkedin, faLinkedinIn, faFacebookF } from "@fortawesome/free-brands-svg-icons";
  
const serverUrl = (process.env.NODE_ENV === 'production') 
? 'https://www.kagwave.com'
:  'http://localhost:8080';

const secureServerUrl = (process.env.NODE_ENV === 'production') 
? 'https://www.kagwave.com'
:  'https://localhost:9090';


const ConnectedApps = (props) => {  

  const { user, providers, fetchAccount } = props;

  useEffect(() => {
    showConnectedApps();
  },[props])

  const showConnectedApps = () => {
    if (providers !== null) {
      if (providers.hasOwnProperty('facebook')){
        document.getElementById('fbConnect').style.color = '#3B5998';
      } 
      if (providers.hasOwnProperty('google')){
        document.getElementById('goConnect').style.color = '#DB4437';
      } 
      if (providers.hasOwnProperty('twitter')){
        document.getElementById('twConnect').style.color = '#55ACEE';
      }
      if (providers.hasOwnProperty('spotify')){
        document.getElementById('spConnect').style.color = '#1DB954';
      }
      if (providers.hasOwnProperty('instagram')){
        document.getElementById('igConnect').style.color = '#833AB4';
      } 
      if (providers.hasOwnProperty('linkedin')){
        document.getElementById('liConnect').style.color = '#2867B2';
      } 
    }
  }

  const disconnectApp = (app) => {
    console.log(user)
    axios({
      method: "POST", 
      url: `${serverUrl}/disconnect/app`, 
      data:  {id: user.id, app: app}
    }).then((response)=>{
    }).catch(err => { console.log(err); });

    delete providers.app;
    fetchAccount();


    setTimeout(() => {
      showConnectedApps();
      console.log(providers);
    }, 2000);
  }  

  return ( 

    <div className="connected-apps-container">

      <button onClick={() => {
        if (providers.hasOwnProperty('facebook')) {
          disconnectApp('facebook');
        } else {
          window.open(`${serverUrl}/connect/facebook`, '_self')
        }
      }}>
        <FontAwesomeIcon className="connected-app" id="fbConnect" icon={faFacebookF}/>
      </button>
      
      <button onClick={() => {
        if (providers.hasOwnProperty('google')) {
          disconnectApp('google');
        } else {
          window.open(`${serverUrl}/connect/google`, '_self');
        }
      }}>
        <FontAwesomeIcon className="connected-app" id="goConnect" icon={faGoogle} style={{fontSize: '22px', margin: '0 3px 10px 3px'}}/>
      </button>        

      <button onClick={() => {
        if (providers.hasOwnProperty('twitter')) {
          disconnectApp('twitter');
        } else {
          window.open(`${serverUrl}/connect/twitter`, '_self');
        }
      }}>
        <FontAwesomeIcon className="connected-app" id="twConnect"icon={faTwitter}/>
      </button>

      <button onClick={() => {
        if (providers.hasOwnProperty('instagram')) {
          disconnectApp('instagram');
        } else {
          window.open(`${serverUrl}/connect/instagram`, '_self');
        }
      }}>
        <FontAwesomeIcon className="connected-app" id="igConnect" icon={faInstagram}/>
      </button>
      
      <button onClick={() => {
        if (providers.hasOwnProperty('spotify')) {
          disconnectApp('spotify');
        } else {
          window.open(`${serverUrl}/connect/spotify`, '_self');
        }
      }}>
        <FontAwesomeIcon className="connected-app" id="spConnect" icon={faSpotify}/>
      </button>

      <button onClick={() => {
        if (providers.hasOwnProperty('linkedin')) {
          disconnectApp('linkedin');
        } else {
          window.open(`${serverUrl}/connect/linkedin`, '_self');
        }
      }}>
        <FontAwesomeIcon className="connected-app" id="liConnect" icon={faLinkedinIn}/>
      </button>

    </div>

  );
}

export default ConnectedApps;