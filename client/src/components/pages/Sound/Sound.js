import { Route, Switch } from 'react-router-dom';

import KingsQuest from './KingsQuest';
import Collaborations from './Collaborations';
import SoundHome from './Home';


const Sound = (props) => {

  const { match } = props;

  return (
    <div id='page-content'>

      <Route exact path={`${match.url}`} render={() => 
        <SoundHome />
      }/>

      <Route exact path={`${match.url}/collaborations`} render={() => 
        <Collaborations />
      }/>

      <Route exact path={`${match.url}/kings-quest`} render={() => 
        <KingsQuest />
      }/>

    </div>
  )

}

export default Sound;