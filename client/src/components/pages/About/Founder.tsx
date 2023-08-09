import './Founder.css'
import ContentUnavailable from '../ContentUnavailable';
import MountDisplay from '../../interface/tools/MountDisplay';
import { useEffect } from 'react';

const Founder = (props: any) => {

  useEffect(() => {
    MountDisplay(undefined, "Founder");
  }, [])

  return (  
    <body>
      <div id="page-content">
        {ContentUnavailable()}
      </div>
    </body>
  );
}
 
export default Founder;