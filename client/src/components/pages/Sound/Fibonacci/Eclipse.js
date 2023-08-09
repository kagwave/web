import './Eclipse.css';
import { useEffect } from 'react';

const Eclipse = () => {
  
  useEffect(() => {
    document.body.classList.add('eclipse');
;  }, []);

  return ( 
    <div id="page-content">
      <div className="eclipse-pg">
        
        
        <div className="moon">
        </div>
      </div>
    </div>
  );
}
 
export default Eclipse;