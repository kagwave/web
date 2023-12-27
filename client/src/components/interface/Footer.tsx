import './Footer.css';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import kagworldlogo from '../../media/images/kagworldlogowhite.png';
import cclogo from '../../media/images/cclogoblue.png';
import iglogo from '../../media/images/iglogo.png';

const Footer = () => {

  return (
    <div id="footer">

      <div id="seperator"></div>
      
      <div id="footer-container"> 
       
        <div className="footer-links">
          <div className="about footer-link">
            <h1>About</h1>
            <li><NavLink to="/mission/">Mission</NavLink></li>
            <li><NavLink to="/partners">Partners</NavLink></li>
            <li><NavLink to="/careers">Careers</NavLink></li>
          </div>
          <div className="resources footer-link">
            <h1>Resources</h1>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/terms">Terms</NavLink></li>
            <li><NavLink to="/privacy">Privacy</NavLink></li>
          </div>
        </div>
      
        <div className="footer-text"> 
          <h1>2023 &copy; Kagwave. Some Rights Reserved.</h1>
          <hr/>
          <div id="footer-credits">
            <img className="sponsor-logo" alt="Kagworld" style={{margin: '5px 0px 5px 0px'}} src={kagworldlogo} />
            <h6>|</h6>
            <h2>powered by</h2>
            <img className="sponsor-logo" alt="CauseClosed" style={{borderRadius: '5px', margin: '0 6px 0px 6px'}} src={cclogo} />
            <h2>.</h2>
          </div>
        </div>

        <div className="footer-icons">
          <a href="https://www.linkedin.com/company/kagwave" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" className="fa fa-facebook"/> 
          </a>
          <a href="https://www.facebook.com/kagwave" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" className="fa fa-facebook"/> 
          </a>
          <a href="https://www.twitter.com/kagwave" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" className="fa fa-twitter"/> 
          </a>
          <a href="https://www.instagram.com/kagwave" target="_blank" rel="noreferrer">
            <img src={iglogo} alt="Instagram" className="fa fa-instagram"/> 
          </a>
        </div>

      </div>
    </div>
  );
}
 
export default Footer;