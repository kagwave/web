import './Header.mobile.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MountDisplay from './tools/MountDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import logo from '../../media/images/ico.png';

const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: 'https://www.kagwave.com';

const HeaderMobile = (props: any) => {

  const { searchCallback } = props;
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);
  const history = useHistory();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wasVideoPlaying, setwasVideoPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [accountHeader, setAccountHeader] = useState<any>();

  var navmenu = document.getElementById("nav-menu-mobile");
  var navbtn = document.querySelector(".nav-dropbtn-mobile");
  var header = document.querySelector(".header-bar-mobile");
  var footer = document.getElementById("footer-container");

  useEffect(() => {

    let searchbtn = document.querySelector('.search-submit-btn-mobile');
    let searchInput = document.getElementById('search-input');

    if (document.getElementById('page-content') !== null){
      document.getElementById('page-content')!.classList.remove('realign-body');
    };

    if (isLoggedIn) {
      fetchHeader();
    }
    MountDisplay(true, undefined);
  }, [props]);

  const fetchHeader = () => {
    axios({
      method: "POST", 
      url: `${serverUrl}/account/header`, 
      data: user
    }).then((response)=>{
      setAccountHeader(response.data);
    }).catch(err => { console.log(err); });
  }

  const openMenu = () => {
    var body = document.getElementById("page-content");
    navbtn!.classList.remove('menu-closed');
    navbtn!.classList.add('menu-open');
    header!.classList.remove('nonactive-header');
    header!.classList.add('active-header');
    navmenu!.classList.remove("slide-out-menu");
    navmenu!.classList.add("slide-in-menu");
    if (document.querySelector('.video') !== null){
      var video: any = document.querySelector('.video');
      if (video.currentTime > 0 && !video.paused){
        setwasVideoPlaying(true);
      } else {
        setwasVideoPlaying(false);
      }
      video.pause();
    }
    navmenu!.classList.remove('hide-element');
    navmenu!.classList.add('show-blockelement');
    body!.classList.add("blur-effect");
    footer!.classList.add("blur-effect");
    body!.style.pointerEvents = "none";
    document.body.style.overflow = "hidden";
    setIsMenuOpen(true);
  }

  const closeMenu = () => {
    var body = document.getElementById("page-content");
    navbtn!.classList.remove('menu-open');
    navbtn!.classList.add('menu-closed');
    header!.classList.remove('active-header');
    header!.classList.add('nonactive-header');
    navmenu!.classList.remove("slide-in-menu");
    navmenu!.classList.add("slide-out-menu");
    setTimeout(function(){
      navmenu!.classList.remove('show-blockelement');
      navmenu!.classList.add("hide-element");
    }, 200); 
    if (document.querySelector('.video') !== null){
      var video: any = document.querySelector('.video');
      if (wasVideoPlaying){
        video.play();
      }
    }
    body!.classList.remove("blur-effect");
    footer!.classList.remove("blur-effect");
    body!.style.pointerEvents = "auto";
    document.body.style.overflow = "auto";
    setIsMenuOpen(false);
  }

  const showNavigation = () => {
    if (isMenuOpen === false){
      openMenu();
    } else {
      closeMenu();
    }
  }

  const showUser = () => {
    if (isLoggedIn){
      return (
        <div className="user-panel-mobile">
          <div id="small-seperator" style={{width: "inherit", padding: "0"}}></div>
        </div>
      );
    
    }
  }


  const handleChange = (e: any) => {
    let entry = e.target.value;
    setSearchQuery(entry);
  };

  const handleKeyPress = (e: any) => {
    if (e.code === "Enter") {
      e.preventDefault();
      closeMenu();
      search();
    }
  }

  const search = () => {
    if (searchQuery) {
      searchCallback(searchQuery);
    }
    let search: any = document.getElementById('search-input')
    search!.value = '';
    setSearchQuery(null);
  }


  return (

    <div className="header-bar-mobile">

      <img className="logo-mobile" 
        src={logo} alt="Kagwave™"
        onClick={() => {history.push('/'); closeMenu()}}
      ></img>

      <button className="nav-dropbtn-mobile menu-closed"
        onClick={showNavigation}
      ></button>

      <div id="nav-menu-mobile" className="hide-element slide-in-menu">

        <div className="search-bar-mobile">
          <input id="search-input" type="search" value={searchQuery} onChange={handleChange} onKeyUp={handleKeyPress} placeholder="" rel="search" />
          <button className="search-submit-btn-mobile" 
            onClick={()=> {closeMenu(); search()}}
          ></button>
        </div>

        <div id="small-seperator" style={{width: "100%", padding: "0"}}></div>

        <div className="menu-options-mobile">
          <ul style={{listStyleType: "none", padding: "0 0 0 2vh", marginTop: '10px', textAlign: "center"}}>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/" exact={true}>Home</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/sound">Sound</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/products">Products</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/store">Store</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/services">Services</NavLink></li>
            <li><NavLink className="navlink-mobile" onClick={closeMenu} to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        <div className="user-panel-mobile-container">
          {showUser()}
        </div>

        <div className="bottom-panel-mobile">
          
          <div className="user-info">
            {isLoggedIn ? 
              <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}} >
                <NavLink to="/me"
                  style={{display: 'flex'}}>
                    <img src={accountHeader ? accountHeader.profile_photo : null} alt={accountHeader ? accountHeader.display_name : null} onClick={closeMenu} width="40px" height="40px"></img>
                </NavLink>
                <div id="seperator" style={{height: '40px', width: '2px', marginLeft: '10px'}}></div>
              </div>     
            : null
            }
          </div>

          <div className="logInOut-options-mobile"> 
            {!isLoggedIn ? 

              <button style = {{marginBottom:'2vh'}}  className="logInOut-btn-mobile" onClick={() => { history.push('/login'); closeMenu();}}>
                Login <FontAwesomeIcon icon={faDoorOpen} color="white" size='lg'/>
              </button> 
              
              : 

              <button className="logInOut-btn-mobile" 
                onClick={() => { window.open(`${serverUrl}/logout`, '_self'); }}
              >
                Logout <FontAwesomeIcon icon={faDoorOpen} color="white" size='lg'/>
              </button>
            }
          </div>

        </div>

      </div>

    </div>
  );
}
 
export default HeaderMobile;