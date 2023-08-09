import microservices from '../data/services';

export const secureServerUrl = (process.env.NODE_ENV === 'production') 
? 'https://www.kagwave.com'
:  'https://localhost:9090';

export const serverUrl = (process.env.NODE_ENV === 'production') 
? 'https://www.kagwave.com'
:  'http://localhost:8080';

export const getServerUrl = (service: string, addPath?: boolean) => {
  let url = (process.env.NODE_ENV === 'production') 
    ? 'https://www.kagwave.com'
    :  `http://localhost:${microservices[service].port}`;
  if (addPath) {url += microservices[service].basePath}
  return url;
}

export const hostUrl = (process.env.NODE_ENV === 'production') 
? "https://www.kagwave.com"
: "http://localhost:3000";

export const websocketUrl = (process.env.NODE_ENV === 'production') 
? `wss://gamewe-web.herokuapp.com`
: `ws://localhost:8080` ;


