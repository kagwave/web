import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './media/loaders/macOS.css'
import './media/loaders/basic.css'

//React Hooks
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { login, logout } from './redux/slices/auth';

//UI
import Header from './components/interface/Header';
import Navbar from './components/interface/Navbar';
import Footer from './components/interface/Footer';

import HeaderMobile from './components/interface/Header.mobile';


//Pages
import Landing from './components/pages/Home/Landing';
import Sound from './components/pages/Sound/Sound';
import Products from './components/pages/Products/Products';
import Store from './components/pages/Store/Store';
import Services from './components/pages/Services/Services';
import Contact from './components/pages/Contact/Contact';
import Search from './components/pages/User/Search'

import Mission from './components/pages/About/Mission';
import Partners from './components/pages/About/Partners';
import Founder from './components/pages/About/Founder';
import Blog from './components/pages/Blog/Home';
import PageNotFound from './components/pages/PageNotFound';

import Privacy from './components/pages/Resources/Privacy';
import Terms from './components/pages/Resources/Terms';

import { serverUrl } from './utils/urls';


function App() {
  
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const breakpoint = 900;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration : 2000,
      once: true
    });
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      let response = await axios.get(`${serverUrl}/user`, {withCredentials: true});
      if (response.data.hasOwnProperty('currentUser')){
        dispatch(login(response.data.currentUser));
      } else {
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
    }
  }

  const updateDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({width: width, height: height});
  }

  const searchCallback = (query: string) => {
    navigate(`/search/${query.replace(/\s+/g, '-')}`);
  }


  return ( 
    <div className="App">

      {dimensions.width > breakpoint ? 
        (!location.pathname.includes('/login') &&
          <>
            <Header/>
            <Navbar searchCallback={searchCallback}/>
          </>
        )
      : 
        <HeaderMobile searchCallback={searchCallback}/>
      }

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sound" element={<Sound />} />
        <Route path="/products" element={<Products />} />
        <Route path="/store" element={<Store />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/search" element={<Search />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;