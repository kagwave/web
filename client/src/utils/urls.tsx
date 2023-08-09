export const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: 'https://www.kagwave.com';

export const hostUrl = (process.env.NODE_ENV === 'production') 
? "https://www.kagwave.com"
: "http://localhost:3000";