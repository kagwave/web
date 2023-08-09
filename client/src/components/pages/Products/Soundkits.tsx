
import './Soundkits.css';
//import classNames from 'classnames';
import { useEffect } from 'react';
import kagkit1 from '../../../media/images/kagkit1.png'
import DrumMachine from '../../plugins/drum-machine/DrumMachine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faDrum, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Soundkits = () => {
  


  useEffect(() => {
    document.title = 'Products - KΛGWΣ';
  }, []);

  const showVirtualKit = () => {
    const drumplugin = document.querySelector('.drumplugin');
    let linkbtn = document.querySelector('.test-kit-btn');
    let productlist = document.querySelector('.product-includes');
    let productdesc = document.querySelector('.product-text');
    let producth1 = document.querySelector('.product-text-h1');
    if (drumplugin.classList.contains('hide-element')){   
      productlist.classList.remove('show-element');
      productlist.classList.add('hide-element');
      productdesc.classList.remove('show-element');
      productdesc.classList.add('hide-element');
      producth1.classList.remove('show-element');
      producth1.classList.add('hide-element');
      linkbtn.classList.remove('show-element');
      linkbtn.classList.add('hide-element');
      drumplugin.classList.remove('hide-element');
      drumplugin.classList.add('show-element', 'fade-in-quick');
      return;
    } else if (drumplugin.classList.contains('show-element')){
      drumplugin.classList.remove('show-element');
      drumplugin.classList.add('hide-element');
      productlist.classList.remove('hide-element');
      productlist.classList.add('show-element', 'fade-in-quick');
      linkbtn.classList.add('show-element', 'fade-in-quick');
      linkbtn.classList.remove('hide-element');
      productdesc.classList.remove('hide-element');
      productdesc.classList.add('show-element', 'fade-in-quick');
      producth1.classList.remove('hide-element');
      producth1.classList.add('show-element', 'fade-in-quick');
      
      return;
    }
  }

  return (   
    <body>
      <div id="page-content">
        <div className="soundkits-pg fade-in">
          <div id="page-content-h1">Sound Kits</div>
          <hr className="draw" style={{height: "3px", background: "black", width:"50%"}}/>
       
          <div className="product-container">

            <div className="product-box">
              <div className="product-buy">
                  <div>
                    <img className="drumkit-img" src={kagkit1} alt="drumkit" />
                  </div>
                  
                  <div>
                    <button className="buy-btn"> 
                      <FontAwesomeIcon icon={faShoppingCart} style={{paddingRight: '5px'}}/>
                      Buy
                    </button>
                  </div>
              </div>
              <div id="vertical-seperator"></div>
              <div className="product-desc">
                <div className="product-text-h1">Kagwave™ Starter Kit</div>
                <div className="product-text">
                  The first collection of raw textured samples, sounds and massive patches. <br/>Containing the fundamental elements to achieving classic production in any genre, this is a must-have in any producer's arsenal.
                </div>
                <div className="product-includes show-element">
                  Includes: 
                  <ul className="product-includes-list">
                    <li>• 17 kicks</li>
                    <li>• 6 snares</li>
                    <li>• 5 snaps</li>
                    <li>• 10 hats</li>
                    <li>• 7 cymbals</li>
                    <li>• 8 basses</li>
                    <li>• 32 foley samples</li>
                    <li>• 10 soundscapes</li>
                    <li>• 14 vocal samples</li>
                    <li>• 8 massive patches</li>
                  </ul>
                </div>
                <div><button className="test-kit-btn show-element" onClick={showVirtualKit}><FontAwesomeIcon icon={faDrum} size="3x"></FontAwesomeIcon></button></div>
                <div className="drumplugin hide-element">
                  <DrumMachine />
                  <button onClick={showVirtualKit} style={{color: "black", background: "transparent", margin: "10px", border: "none", padding: '0'}}><FontAwesomeIcon className='nav-btn' icon={faChevronLeft} size="lg" ></FontAwesomeIcon></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
 
export default Soundkits;