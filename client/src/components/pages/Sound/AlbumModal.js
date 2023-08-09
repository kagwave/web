import './Home.css'

import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoundcloud, faSpotify, faApple, faBandcamp, faYoutube } from '@fortawesome/free-brands-svg-icons';

import MountDisplay from '../../interface/tools/MountDisplay';

import sound from '../../../data/sound';

const AlbumModal = (props) => {

  const { modalIndex, setModalIndex } = props;
  const { title, year , albumImg, tracklist, emoji, specs } = sound.fibonacci.main[modalIndex];

  useEffect(() => {

    let body = document.querySelector('.sound-pg');
    let header;
    if (!document.querySelector(".header-bar")){
      header = document.querySelector(".header-bar-mobile");
    } else {
      header = document.querySelector('.header-bar');
    };
    
    //set up modal environment
    body.classList.add("blur-effect");
    header.classList.add("blur-effect");
    header.style.pointerEvents = "none";
    if (document.querySelector(".navbar") !== null){
      document.querySelector(".navbar").classList.add("blur-effect");
    };


    let handler = function(e){
      if (e.target.id !== 'myModal') {
        setModalIndex();
        header.style.pointerEvents = "auto";
        body.classList.remove("blur-effect");
        header.classList.remove("blur-effect");
        if (document.querySelector(".navbar") !== null){
          document.querySelector(".navbar").classList.remove("blur-effect");
        };
      }
    }
    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler, true);
    }
  }, [])

  return (
    <div id="myModal" className="modal">
    <div className="close">&times;</div>
    <div className="modal-content animate-top">
    <div className="modal-header">
        <div className="modal-header-text">{emoji} v{specs.version}</div>
    </div>

    <div className="modal-body">
        <div className= "album-img"> <img src={albumImg} alt="Eclipse" style={{border: '0', width: '100%', height: '100%'}}/>  </div>
        
        <div className="album-about">

        <div className="album-h1"></div>
        <div id="small-seperator" style={{width:"60%"}}></div>

        <div className="album-desc">
            <ol className="tracklist">
            {tracklist.map(track =>
                <li key={track.title}>
                {track.title}
                </li>
            )}
            </ol>
        </div>

        

        <div className="album-links">
            <a target="_blank" rel="noreferrer" href={sound.fibonacci.main[modalIndex].links.soundcloud}><FontAwesomeIcon className="album-icon" icon={faSoundcloud} size="2x" color="#FE5000"></FontAwesomeIcon></a>
            <a target="_blank" rel="noreferrer" href={sound.fibonacci.main[modalIndex].links.spotify}><FontAwesomeIcon className="album-icon" icon={faSpotify} size="2x" color="#1DB954"></FontAwesomeIcon></a>
            <a target="_blank" rel="noreferrer" href={sound.fibonacci.main[modalIndex].links.bandcamp}><FontAwesomeIcon className="album-icon" icon={faBandcamp} size="2x" color="#629aa9"></FontAwesomeIcon></a>
            <a target="_blank" rel="noreferrer" href={sound.fibonacci.main[modalIndex].links.youtube}><FontAwesomeIcon className="album-icon" icon={faYoutube} size="2x" color="#FF0000"></FontAwesomeIcon></a>
            <a target="_blank" rel="noreferrer" href={sound.fibonacci.main[modalIndex].links.applemusic}><FontAwesomeIcon className="album-icon" icon={faApple} size="2x" color="#A3AAAE"></FontAwesomeIcon></a>
        </div>

        </div>
    </div>


    <div className="modal-footer">
        <div className="modal-footer-text">year: {year} || last upgrade: {specs.lastUpdate}</div>
    </div>


    </div>

    </div>
  )

}

export default AlbumModal;