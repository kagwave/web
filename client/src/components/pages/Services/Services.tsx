import './Services.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import MountDisplay from '../../interface/tools/MountDisplay';

const Services = (props: any) => {

  const navigate = useNavigate();

  useEffect(() => {

    MountDisplay(undefined, "Services");

    let collapsible: any = document.getElementsByClassName("collapsible");
    for (let i = 0; i < collapsible.length; i++) {
      collapsible[i].addEventListener("click", function() {
        collapsible.classList.toggle("active-collapsed");
        let content = collapsible.nextElementSibling;
        content.classList.toggle("fade-in-quick");
        if (content.style.height ){//||content.classList.contains("animate-right")
          content.style.height = null;
         // content.classList.remove("animate-right");
        } else {
          content.style.height = "60px";
         // content.classList.add("animate-right");
        } 
      });
    }

  }, []);

  return ( 
    <div id="page-content">
      <div className= "service-pg animate-left">

        <br />
        <br />

        {/*<div className = "services-h1"> What We Do</div>*/}
        <div className="services-container">
          <button className="service-header collapsible" style={{borderRadius: '5px 5px 0 0'}}>Sync Licensing</button>
              <div className="collapsed-content">
                
                <div className="service-desc">
                  <div className="service-desc-text">🎞️ Original audio for advertisements, film, and games.</div>
                  <button className="more-btn-arrow" onClick={() => navigate('/contact')}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="lg"></FontAwesomeIcon>
                  </button>
                
                </div>
                
              </div>
          <button className="service-header collapsible" >Brand Partnerships</button>
              <div className="collapsed-content">

              <div className="service-desc">
                <div className="service-desc-text">🔗 Let's work together.</div>
                <button className="more-btn-arrow" onClick={() => navigate('/contact')}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="lg"></FontAwesomeIcon>
                  </button>
                
                </div>
                
              </div>
          <button className="service-header collapsible">Creative Consultancy</button>
              <div className="collapsed-content">
              <div className="service-desc">
                <div className="service-desc-text">📈 Growing your business/product utilizing tailored marketing techniques.</div>
                <button className="more-btn-arrow" onClick={() => navigate('/contact')}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="lg"></FontAwesomeIcon>
                  </button>
                
                </div>
              </div>
          <button className="service-header collapsible">Mix Engineering/Mastering</button>
              <div className="collapsed-content">
              <div className="service-desc">
                <div className="service-desc-text">🎙️ Studio-quality audio editing, processing, and post-production.</div>
                <button className="more-btn-arrow" onClick={() => navigate('/contact')}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="lg"></FontAwesomeIcon>
                  </button>

                
                </div>
              </div>
          <button className="service-header collapsible" style={{borderRadius: '0 0 5px 5px'}}>Bookings</button>
              <div className="collapsed-content">
              <div className="service-desc">
                <div className="service-desc-text">🎉 Let's make your next event one to remember.</div>
                <button className="more-btn-arrow" onClick={() => navigate('/contact')}>
                    <FontAwesomeIcon icon={faChevronCircleRight} size="lg"></FontAwesomeIcon>
                  </button>
                
                </div>
              </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
          
      </div>

    </div>
  );
}
 
export default Services;