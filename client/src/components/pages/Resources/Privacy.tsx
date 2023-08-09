import { useEffect } from 'react';

import MountDisplay from '../../interface/tools/MountDisplay';
import ContentUnavailable from '../ContentUnavailable';

const Privacy = (props: any) => {

  useEffect(() => {
    MountDisplay(undefined, "Privacy");
  }, []);

  return (  
    <body>
      <div id="page-content">
        {ContentUnavailable()}
      </div>
    </body>
  );
}
 
export default Privacy;