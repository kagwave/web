import './Home.css'

import { useEffect, useState } from 'react';

import MountDisplay from '../../interface/tools/MountDisplay';

import createId from '../../../tools/createId';

import sound from '../../../data/sound';
import AlbumModal from './AlbumModal';

const SoundHome = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [modalIndex, setModalIndex] = useState();
  
  useEffect(() => {
    MountDisplay(undefined, "Sound");
    setIsLoading(false);
  }, []);
  
  return (  
    <> 
      {modalIndex !== undefined && 
        <AlbumModal modalIndex={modalIndex} setModalIndex={setModalIndex}/>
      }

      {isLoading ? 

        <div id="loading-pg">
          <div id="basic-loader"></div>
        </div>

      :

        <div className="sound-pg fade-in-quick">

          <div className="sound-pg-section">

            <section id="Fib-sequence">

              {sound.fibonacci.main.map((track, i, fibArr) => {
                return (
                  <div className="fib-product" key={createId(5)}>
                    <button id="album-btn" className="album-btn fib-album-img" 
                      style={{backgroundImage:"url(" + fibArr[i].albumImg + ")"}}
                      onClick={() => setModalIndex(i)} 
                    ></button>
                    <div className="fib-album-info">
                      <h5>{fibArr[i].title}</h5>
                      <h6>v{fibArr[i].specs.version}</h6>
                    </div>
                  </div>
                )
              })}
                
            </section>
          
          </div>
        
          <div id="seperator"></div>

          <br/>

          <div className="sound-pg-section">
        
            <section id="Pieces">
              {sound.fibonacci.singles.map((track, i, singlesArr) => {
                return (
                  <div className="single-track" key={createId(5)}>
                    <button className="single-img-btn" 
                      style={{border: '0', width: '170px', height: '170px', 
                      backgroundImage: "url(" + singlesArr[i].albumImg + ")",
                      backgroundSize: '170px 170px', backgroundRepeat: 'no-repeat'}}
                      onClick={() => window.open(singlesArr[i].links.fanlink, '_blank')}
                    ></button>
                    <div className="fib-single-info">
                      <h5>{singlesArr[i].title}</h5>
                      <h6>({singlesArr[i].year})</h6>
                    </div>
                  </div>
                )
              })}
            </section>

          </div>
          
        </div>
    
      }
    </>
     
  );
}


export default SoundHome;


