import './Mission.css';
import MountDisplay from '../../interface/tools/MountDisplay';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import greece from '../../../media/images/greece.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const Mission = () => {

  const navigate = useNavigate();

  useEffect(() => {
    MountDisplay(undefined, "Mission");
  }, []);

  return (  
    <div id="page-content">

      <div className="mission-pg fade-in-quick">

        <h1>Mission</h1>

        <div id="seperator" style={{width: '60%', margin: '0', padding: '0', height: '2px', background: '#a3e0e7'}}></div>

        <div className="mission-info">

          <div className="mission-img">
            <img className="mission-photo" src={greece}/>
          </div>

          <div className="mission-statement">
            <h2>
              In sixth century B.C.E., early Greek philosophers sought to understand objective reality. They found logos (reason) to be an attribute of existence that is universal, and that through adopting this reason we can not only discover truths but also derive ethics and moral values.
            <br/><br/>
              Kagwave revives this way of life, applying universal reason to its products and consequently inspiring it in the lives of humanity. More than a design enterprise, it is a movement of like-minded individuals who seek cognitive excellence, intellectual expression, and technological innovation— while never sacrificing the values that make us who we are.
            </h2>
            <h2 style={{fontSize: '14px', fontFamily: 'Questrial'}}>
              Learn More about Universal Reason. 
              <FontAwesomeIcon icon={faChevronCircleRight} className="mission-learn-more-btn" onClick={() => navigate('/blog/philosophy/1645051479')}/>
            </h2>
          </div>
        </div>

      </div>
    </div>
);
}
 
export default Mission;