import robot from '../../media/images/robot.png';

const ContentUnavailable = () => {
  return ( 
    <div className="content-unavailable">
      <img src={robot} alt="robot" className="progress-robot"/>
        <h1>[ Content momentarily unavailable. ]</h1>
        <p>* We're working on this. This information will be public shortly. *</p>
    </div>
  );
}
 
export default ContentUnavailable ;