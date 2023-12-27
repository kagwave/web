export const secureServerUrl = (process.env.NODE_ENV === 'production') 
? 'https://www.kagwave.com'
:  'https://localhost:9090';

export const serverUrl = (process.env.NODE_ENV === 'production') 
? 'https://www.kagwave.com'
:  'http://localhost:8080';

export const hostUrl = (process.env.NODE_ENV === 'production') 
? "https://www.kagwave.com"
: "http://localhost:3000";




