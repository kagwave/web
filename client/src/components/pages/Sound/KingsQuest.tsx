import './KingsQuest.css';
import { useEffect } from 'react';
import MountDisplay from '../../interface/tools/MountDisplay';

const KingsQuest = () => {

  useEffect(() => {
    if (document.querySelector('.sound-pg-section') !== null){
      setTimeout(() => {
        let btn = document.querySelector('.sound-dropbtn') as HTMLElement;
        btn.style.color = '#a3e0e7'
      }, 50);
    }
    MountDisplay(undefined, "King's Quest");
  }, []);


  return (  
    <div className="sound-pg-section" style={{width: 'inherit', height:'inherit', backgroundPosition: 'center bottom'}}>
      <section id="Kings-Quest">
  
        <div className="kq-product">
        <div className="kq1">
            <button id="album-btn" className="album-btn kq-img" style={{backgroundImage:"url('https://f4.bcbits.com/img/a0384192438_10.jpg')"}}
              onClick={() => window.open('https://fanlink.to/kingsquest001', '_blank')}
            ></button>
        </div>
        <div className="kq-album-info">
            <h5>001: Exile</h5>
            <h6>v1.0</h6>
        </div>
        </div>
      </section>
    </div>
  );
}
 
export default KingsQuest;