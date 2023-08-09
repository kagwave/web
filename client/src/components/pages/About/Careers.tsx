import ContentUnavailable from '../ContentUnavailable';
import MountDisplay from '../../interface/tools/MountDisplay';
import { useEffect } from 'react';

const Careers = (props: any) => {

  useEffect(() => {
    MountDisplay(undefined, "Careers");
  }, [])

  return (  
    <body>
      <div id="page-content">
        {ContentUnavailable()}
      </div>
    </body>
  );
}
 
export default Careers;