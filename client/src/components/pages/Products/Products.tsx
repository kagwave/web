import './Products.css';
import React from 'react';
import { useEffect } from 'react';
//import { NavLink } from 'react-router-dom';

import MountDisplay from '../../interface/tools/MountDisplay';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
//import kagkit1 from '../../../media/images/kagkit1.png'


const Products = (props: any) => {

  useEffect(() => {
    MountDisplay(undefined, "Products");
  }, []);

  return (  
    <div id="page-content">

      <div className="inProgress fade-in">
        <div className="inProgressText"> launching soon... </div>
      </div>



      {/*<div className="products-pg fade-in-quick">
        <div className="latest-product-preview"> 
          <div>
            <img className="drumkit-img fade-in-quick" src={kagkit1} alt="drumkit" />
          </div>
          <div className="latest-product-preview-header animate-left">🥁 KagKit™ Vol. 1</div>
          <div>
            <NavLink to='/products/soundkits'><FontAwesomeIcon icon={faChevronCircleRight} size="lg" className="nav-btn"></FontAwesomeIcon></NavLink>
          </div>
        </div>
      </div>*/}
    </div>
  );
}
 
export default Products;