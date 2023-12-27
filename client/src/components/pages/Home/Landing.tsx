import './Landing.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Waypoint } from 'react-waypoint';
import MountDisplay from '../../interface/tools/MountDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import eclipsepromo from '../../../media/video/EclipsePromo.mp4';


const Landing = () => {

  const navigate = useNavigate();

  useEffect(() => {
    MountDisplay(undefined, undefined);
  }, []);

  const handleEnterViewport = () => {
    let video: any = document.querySelector("video");
    if (video.currentTime !== 0){
      video.controls = false;
    } else {
      video.controls = true;
    }
    video.play();
  }

  const handleExitViewport = () => {
    let video: any = document.querySelector("video");
    video.pause();
  }

  const showControls = () => {
    let video: any = document.querySelector("video");
    video.controls = true;
  }

  return ( 
    <div id="page-content">
      
      <div className="home-pg">

        <div className="landing">
          <div className="landingtext animate-bottom">
            <div className="landing-h1">[ universal reason ]</div>
            <div className="landing-h2">an underpinning system of perception and conception of all forms of complexity.</div>
          </div>
        </div>

        <div id="seperator"></div>

        <div className="latest-release">

          <div className="latest-preview">
            <Waypoint scrollableAncestor={window} onEnter={handleEnterViewport} onLeave={handleExitViewport}>
              <video controls onEnded={showControls} poster="null" id="promo" className="video" width="90%" height="100%">
                <source src={eclipsepromo} type="video/mp4"/>
              </video>
            </Waypoint>
          </div>

          <div className="latest-desc">
            <div className="latest-text">
              <h1 data-aos="fade-in" style={{fontSize: "50px", fontFamily: 'Questrial', color: 'white'}}>🌑 Eclipse</h1>
              <h2 style={{ fontSize: "19px", fontFamily: 'Expansiva', color: 'gray'}}>command:// *moon #override.</h2>
              <br/>
              <p data-aos="fade-in" style={{fontSize: "20px", fontFamily: 'Questrial', margin: '5px 0 0 0'}}>available now.</p>
              <p data-aos="fade-in" style={{fontSize: "9px", fontFamily: 'Aspergit', fontStyle: 'italic', fontWeight: 'bold', textDecoration: "italic", margin: '5px', color:'gray'}}>In select stores only. Subscription may be required.</p>
            </div>
            <div data-aos="fade-in" className="latest-links">
              <button onClick={() => navigate('/sound')}>Learn More
                <FontAwesomeIcon icon={faChevronRight} color="white" style={{padding: "0 5px 0 5px"}}/>
              </button>
              <button onClick={() => window.open('http://fanlink.to/eclipseep', '_blank')}>Buy
                <FontAwesomeIcon icon={faChevronRight} color="white" style={{padding: "0 5px 0 5px"}}/>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
   ); 
}

export default Landing;



