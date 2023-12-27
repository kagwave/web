import './Collaborations.css';

const Collaborations = () => {
    return (  
      <div id="page-content">
        <div className="collabs-pg fade-in">
          <div id = "page-content-h1">Collaborations</div>
          <hr/>

          <div className = "showcase">
            <div className="collab-preview">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/nbN4ta4Cdew" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="collab-desc">BLUPRINT</div>
          </div>

          <hr/>

          <div className = "showcase">
            <div className="collab-desc">MAT RANDOL</div>
              <div className="collab-preview">  
                <iframe  width="560" height="315" src="https://www.youtube.com/embed/aPlgyYmdd9s" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>

        </div>
      </div>
    );
}
 
export default Collaborations;