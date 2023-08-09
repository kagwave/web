import React from 'react';
import ContentUnavailable from '../ContentUnavailable';
import MountDisplay from '../../interface/tools/MountDisplay';
import { useEffect } from 'react';

const Partners = (props: any) => {
  
  useEffect(() => {
    MountDisplay(undefined, "Partners");
  }, [])

  return (  
    <body>
      <div id="page-content">
        {ContentUnavailable()}
      </div>
    </body>
  );
}

export default Partners;