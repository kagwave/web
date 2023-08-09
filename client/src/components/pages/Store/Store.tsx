import './Store.css';
import { useEffect } from 'react';

import MountDisplay from '../../interface/tools/MountDisplay';

import designs from '../../../data/store';


const Store = (props: any) => {

  useEffect(() => {
    MountDisplay(undefined, "Store");
  }, []);

  return (  
    <div id="page-content">
      <div className='store-landing-pg'>
        {designs.map(design => {
          return (
            <div className='store-landing-latest-main'>
              <img src={design.main_img} style={{width: '100%'}}/>
            </div>
          )
        })}
      </div>
    </div>
  );
}
 
export default Store;