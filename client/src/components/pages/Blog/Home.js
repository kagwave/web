import './Home.css'

import { useEffect, useState } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';

import MountDisplay from '../../interface/tools/MountDisplay';

import Post from './Post';
import posts from '../../../data/blog/posts';

const Blog = (props) => {

  const { user, match } = props;
  const location = useLocation();

  useEffect(() =>{
    if (location.pathname === '/blog') {
      MountDisplay(undefined, "Blog");
    }
  }, [location.pathname]);


  return ( 
    <div id="page-content">

      <Switch>
        
        <Route exact path={`${match.url}`} render={() => 

          <div className='blog-pg fade-in'>

            <div className='blog-pg-header'>
              <h1>Blog</h1>
            </div>

            <div className="blog-home">

              {/*<div className='blog-navbar'>
              </div>*/}

              <div className='blog-home-main'>

                {posts.map(post => {
                  return (
                    <Link to={`${match.url}/${post.category.toLowerCase()}/${post.timestamp}`} style={{textDecoration: 'none'}}> 
                      <div className="post-preview">
                        <img src={post.icon} width={350}/>
                        <div className='post-preview-title'>
                          <h1>{post.title} </h1>
                        </div>
                        <div className='post-preview-detail'>
                        </div>

                      </div>                 
                    </Link>
                  )
                })}

              </div>
              
            </div>

          </div>
        
        } />

        <Route exact path={`${match.url}/:category/:timestamp`} render={(props) => 
          <Post {...props} user={user}/>
        } />

      </Switch>
       
    </div>
  );
}
 
export default Blog;