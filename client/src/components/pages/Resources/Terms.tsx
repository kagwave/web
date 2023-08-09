import { useEffect } from 'react';

import MountDisplay from '../../interface/tools/MountDisplay';
import ContentUnavailable from '../ContentUnavailable';

const Terms = (props: any) => {

  useEffect(() => {
    MountDisplay(undefined, "Terms");
  }, []);

  return (  
    <body>
      <div id="page-content">
        {ContentUnavailable()}
      </div>
    </body>
  );
}
 
export default Terms;