import { Route, Routes } from 'react-router-dom';

import KingsQuest from './KingsQuest';
import Collaborations from './Collaborations';
import SoundHome from './Home';

const Sound = () => {

  return (
    <Routes>
      <Route path="/" element={<SoundHome />}/>
      <Route path="/collaborations"  element={<Collaborations />}/>
      <Route path="/kings-quest"  element={<KingsQuest />}/>
    </Routes>
  )

}

export default Sound;