import './Search.css';
import { useState, useEffect } from 'react';
import { Route, useLocation, useNavigate } from 'react-router-dom';

import MountDisplay from '../../interface/tools/MountDisplay'

const hostUrl = (process.env.NODE_ENV === 'production') 
? "https://www.kagwave.com"
: "http://localhost:3000";

const serverUrl = (process.env.NODE_ENV === 'development') 
? "http://localhost:8080"
: "https://www.kagwave.com";

const Search = (props) => {

  const { user, match } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState();
  const [results, setResults] = useState();


  useEffect(() => {
    let queryUrl = location.pathname.split("/").slice(2).join("/").replace(/-/g, ' ');
    setQuery(queryUrl);
    console.log(queryUrl)
    //getResults();
    MountDisplay(undefined, queryUrl ? queryUrl : 'Search')
    document.querySelector("link[rel='icon']").href = "favicon.ico";
  }, [location.pathname]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }


  return ( 
    <div id="page-content" style={{background: '#171d1e'}}>
      <div className='search-pg'>

        <h1>Search</h1>

        <div className="search-pg-bar">

          <form className="search-pg-input-form" action={query && `${hostUrl}/search/${query.replace(/\s+/g, '-')}`}>
            <input id="search-pg-input" value={query ? query : ''} onChange={handleChange}/>
          </form>
          
          
          {query && 
          <button className="clear-search-pg-input-btn fade-in-quick" 
            onClick={() => {
              setQuery(); 
              if (location.pathname !== '/search') {
                navigate('/search');
              } 
              document.getElementById('search-pg-input').focus()}}>
          </button>}

        </div>
        

        <div id="seperator" style={{width: '100%', height: '1px', margin: '20px 0 20px 0'}}></div>
            
        {location.pathname === '/search' || location.pathname === '/search/' ? 
        
          <div className='search-pg-results-container'>
            <h6>Enter a Query.</h6>
          </div>
        
        :
        
          <Route exact path={`${match.url}/:query`} render={(props) => 
            <div className='search-pg-results-container'>
              {results ? 
                <div className='search-pg-results'>

                </div>
            
              : 
                <>
                <h6>No matches found.</h6>
                <h6>Try a different query.</h6>
                </>
              }
            </div>
          } />
        }
  
      </div>

    </div>
  );
}
 
export default Search;