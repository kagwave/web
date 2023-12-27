import './Navbar.css';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { hostUrl } from '../../utils/urls';


const Navbar = (props: any) => {

  const { searchCallback } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const firstUpdate = useRef(true);

  const [navDistFromTop, setNavDistFromTop] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<any>();

  useEffect(() => {
    let header = document.querySelector(".header-bar");
    let navbar = document.querySelector(".navbar");
    let menu = document.querySelector(".menuoptions");
    var homebtn = document.querySelector('.home-btn');
    var soundbtn: any = document.querySelector('.sound-dropbtn');
    let search = document.getElementById('search-container');
    let searchbtn = document.querySelector('.search-btn');
    let searchInput = document.getElementById('search-input');

    var currentPage = location.pathname;

    //remove blur on load
    if (document.getElementById('page-content') !== null){
      document.getElementById('page-content')!.classList.remove('blur-effect');
      document.getElementById('footer-container')!.classList.remove('blur-effect');
    }

    //Nav Animation
    if (currentPage.includes('sound') || currentPage.includes('products') || currentPage.includes('store')){
      search!.style.display = 'none';
      search!.style.position = 'fixed';
      searchInput!.style.color = "black";
      //search.classList.remove('undo-reposition-search');
      //search.classList.add('reposition-search');
      navbar!.classList.add("shrink-nav");
      menu!.classList.add("resize-menu");
      navbar!.classList.remove("unshrink-nav");
      menu!.classList.remove("unresize-menu");
      searchbtn!.classList.remove('search-img');
      searchbtn!.classList.add('search-img-blk');
      search!.style.display = "flex";
      firstUpdate.current = false;
    } else if (firstUpdate.current !== true){
      search!.style.display = 'none';
      search!.style.position = 'absolute';
      searchInput!.style.color = "white"
      //search.classList.remove('reposition-search');
      //search.classList.add('undo-reposition-search');
      navbar!.classList.remove("shrink-nav");
      menu!.classList.remove("resize-menu");
      navbar!.classList.add("unshrink-nav");
      menu!.classList.add("unresize-menu");
      searchbtn!.classList.remove('search-img-blk');
      searchbtn!.classList.add('search-img');     
      search!.style.display = "flex";
    }

    //change home button color on click
    if (currentPage === '/'){
      homebtn!.classList.remove("home-img");
      homebtn!.classList.add("home-img-blue");
    } else {
      homebtn!.classList.add("home-img");
      homebtn!.classList.remove("home-img-blue");
    }

    //change sound dropdown color on click
    if (currentPage === '/sound'){
      soundbtn!.style.color =  "#a3e0e7";
    } else {
      soundbtn!.style.color = 'white';
    }
    
  }, [location.pathname]);

  document.addEventListener("scroll", function () {

    if (document.querySelector(".navbar") !== null){
      let navbar = document.querySelector(".navbar");
      let content = document.getElementById("page-content");
      let dropdown: any = document.querySelector(".sound-dropdown-content");
      var topHeight = 115;

      let distanceFromTop = Math.abs(
        document.body.getBoundingClientRect().top
      );
      
      setNavDistFromTop(distanceFromTop);

      if (distanceFromTop >= topHeight) {
        navbar!.classList.add("fixed-top");
        content!.classList.add("realign-body");
        dropdown!.style.marginTop = '5px';
      } else {
        navbar!.classList.remove("fixed-top");
        content!.classList.remove("realign-body");
      }
    } else {
      return;
    }
  });

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
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
    <nav className="navbar">
      <div className="menuoptions">

        <div className="home-btn-container">
          <button className="home-btn home-img" 
            onClick={() => navigate('/')}
          ></button>
        </div>

        <div className="sound-dropdown navlink">
          <NavLink to="/sound" className="sound-dropbtn"
            //onClick={() => {navigate('/sound')}}
          >Sound
          <span className="freespace"></span>
          <FontAwesomeIcon className="caret" icon={faCaretDown} size="xs"/>
          </NavLink>
          <div className="sound-dropdown-content fade-in-quick" style={{marginTop: 5 - navDistFromTop}}>
            <div className="menu-gap-fill"></div>
            <NavLink className="navlink" to="/sound">🌀  Fibonacci</NavLink>
            <NavLink className="navlink" to="/sound/kings-quest">👑  King's Quest™</NavLink>
            {/*<NavLink className="navlink" to="/sound/collaborations">Collaborations</NavLink>*/}
          </div>
        </div>

        <NavLink className="navlink" to="/products">Products</NavLink>
        <NavLink className="navlink" to="/store">Store</NavLink>
        <NavLink className="navlink" to="/services">Services</NavLink>
        <NavLink className="navlink" to="/contact">Contact</NavLink> 

        <div id="search-container" onMouseEnter={() => {document.getElementById('search-bar')!.style.visibility = "visible";}}
            onMouseLeave={() => {document.getElementById('search-bar')!.style.visibility = "hidden"}}>

          <form id="search-bar" className="fade-in-quick" action={searchQuery && `${hostUrl}/search/${searchQuery.replace(/\s+/g, '-')}`}>
            <input type="search" placeholder='Search...' id="search-input" value={searchQuery} onChange={handleChange}/>
          </form>

          <button className="search-btn search-img" 
            onClick={search}
          ></button>

        </div>

      </div>
  </nav>
  );
}

export default Navbar;