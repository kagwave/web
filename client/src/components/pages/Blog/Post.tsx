import './Post.css'

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import posts from '../../../data/blog/posts';
import authors from '../../../data/blog/authors'; 
import MountDisplay from '../../interface/tools/MountDisplay'
import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { serverUrl } from '../../../utils/urls';

const Post = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState<any>();
  const [author, setAuthor] = useState<any>();

  useEffect(() =>{
    let postId = location.pathname.split("/").slice(3).join("/");
    getPost(postId);
  }, []);

  useEffect(() => {
    if (post) {
      MountDisplay(undefined, `${post.title} - Blog`);
      getAuthor(post.author);
    }
  }, [post]);


  const getPost = (id: any) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].timestamp === id) {
        setPost(posts[i]);
      }
    }
  }

  const getAuthor = (author: any) => {
    for (let i = 0; i < authors.length; i++) {
      if (authors[i].name === post.author) {
        setAuthor(authors[i]);
      }
    }
  }

  return ( 
    <>
    {(post && author) ? 
      <div className='blog-post-pg'>

        <div className='blog-post-pg-header'>

          <button className="blog-post-pg-nav" 
            onClick={() => navigate('/blog')}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{marginRight: '10px'}}/>
            <p>Blog Home</p>
          </button>

          <div className='blog-post-hashtags'>
            {post.hashtags.map((hashtag: any, i: number, hashtagsArr: any[]) => {
              if (i === hashtagsArr.length - 1) {
                return (
                  <h1>{`#${hashtag}`}</h1>
                )
              } else {
                let str = '#' + hashtag + ',';
                return (
                  <h1>{str}&nbsp;</h1>
                )
              }
              
            })}
          </div>

        </div>

        <div className='blog-post'>

          <h1>{post.title}</h1>

          <div className="blog-post-info">
            <h2>by {post.author}</h2>
            <h2 style={{margin: '0 10px 0 10px'}}> | </h2>
            <h3>{post.date}</h3>
            <h2 style={{margin: '0 10px 0 10px'}}> | </h2>
            <h3>{post.minutes} min. read</h3>
          </div>

          <img src={post.mainimage} className="blog-post-main-image"/>

          <div className="blog-post-content">
            {post.content.map((paragraph: any) => {
                return (
                <div className="blog-post-paragraph">
                  {paragraph}
                  <br/><br/>
                </div>
                )
            })}
          </div>

          <div className='blog-post-footer'>
            <h1>Connect with the Author:</h1>
            <button className='post-footer-link-btn' onClick={() => window.open(`${author.links.twitter}`, '_blank')}>
              <FontAwesomeIcon icon={faTwitter} size="2x"/>
            </button>
            <button className='post-footer-link-btn' onClick={() => window.open(`${author.links.linkedin}`, '_blank')}>
              <FontAwesomeIcon icon={faLinkedinIn} size="2x"/>
            </button>
          </div>

          {/*<div id="seperator" style={{height: '1px', width: '100%'}}></div>

          <div className='blog-post-feedback-section'>
            <div className='blog-post-reactions'>
              <button>
                🙌 0
              </button>
            </div>
            <h1>Feedback</h1>
          </div>*/}

        </div>

      </div>

    : 

    <div id="loading-pg">
      <div id="loader"></div>
    </div>
    }

    </>
  );
}
 
export default Post;