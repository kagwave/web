import { useHistory } from 'react-router-dom';

const PageNotFound = (props: any) => {

  const history = useHistory();

  return (  
    <div id="page-content">
      <div className="not-found">
        <h1 style={{margin: '20px', fontFamily: "Neo", color: 'white'}}>
          This page doesn't exist?
        </h1>
        <h2 style={{margin: '5px', fontFamily: "Vezla", fontSize: '15px', color: 'gray'}}>
          404 Error: The requested /url destination cannot be found.
        </h2>
        <button style={{color: 'white', margin: '8px'}}
          onClick={() => history.push('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
}
 
export default PageNotFound;