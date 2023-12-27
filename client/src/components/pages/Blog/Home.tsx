import './Home.css'

import { useEffect, } from 'react';
import { Route, Link, useLocation, Routes } from 'react-router-dom';

import MountDisplay from '../../interface/tools/MountDisplay';

import Post from './Post';
import posts from '../../../data/blog/posts';

const Blog = (props: any) => {

  const { user, match } = props;
  const { pathname } = useLocation();

  useEffect(() =>{
    if (location.pathname === '/blog') {
      MountDisplay(undefined, "Blog");
    }
  }, [pathname]);


  return ( 
    <div id="page-content">

      <Routes>
        
        <Route path="/" element={ 

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

        <Route path={`/:category/:timestamp`} element={
          <Post {...props} user={user}/>
        } />

      </Routes>
       
    </div>
  );
}
 
export default Blog;