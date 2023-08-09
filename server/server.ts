/*const hostUrl = (process.env.NODE_ENV === 'production') 
? "https://www.kagwave.com"
: "http://localhost:3000";


//Main Setup
import path from 'path';
import * as dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from 'express';
import session from 'express-session';
const app: Application = express();

let PORT: string | number = process.env.PORT || 8080;
let SSLPORT: string | number = process.env.PORT || 9090;


//SSR Setup
import React from 'react'
import ReactDOMServer from 'react-dom/server'
//import { Provider } from 'react-redux';
import KagwaveApp from "../client/src/App.js"
//import store from '../redux/store';
//import { Helmet, HelmetProvider } from 'react-helmet-async';



//MiddleWare and Tools
import cors from 'cors';
import fs  from 'file-system';
import http from 'http';
import https from 'https';
import passport from 'passport';


//Headers
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', hostUrl);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(cors({
  methods:['GET','POST', 'PUT'],
  origin: hostUrl,
  credentials: true 
}));
app.set('trust proxy', 1);
app.disable('x-powered-by');


//Database Connection
require('./config/db');


//NodeMailer
require('./config/nodemailer')


//Authentication
require('./config/passport');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

require('./routes/auth')(app);



//Routes
require('./routes/account')(app);







//SSR
app.get("*", async (req: Request, res: Response) => {

  const content = ReactDOMServer.renderToString(React.createElement(KagwaveApp));
  const data = fs.readFileSync(path.resolve('./dist/index.html'), 'utf8');
  const store = {};

    //<Provider store={store}>
    //KagwaveApp
   //</Provider>,
  //);
  /*const helmet = Helmet.renderStatic();

  const html = `
  <!DOCTYPE html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="root">
        ${appString}
      </div>
      </body>
  </html>
  `;
  res.send(html);

  const preloadedState = `<script type="text/javascript" charset="utf-8"> window.__PRELOADED__STATE__ = ${JSON.stringify(store ? store : {})} </script>`;
  const serverRenderedHTML = data.replace(
    '<div id="root"></div>',
    `<div id="root">${content}</div>${preloadedState}`,
  );

  res.status(200).send(serverRenderedHTML);

  /*const helmetContext = {};
  const ssr = (
    <HelmetProvider context={helmetContext}>
      <App/>
    </HelmetProvider>
  );*/
  // ...code may content any async actions
  /*const html = renderToString(ssr);
  const { helmet } = helmetContext;
  res.send(html);

});



//Build
if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


//Server
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

if (process.env.NODE_ENV !== "production"){
  const httpsOptions = {
    key: fs.readFileSync('./server/config/ssl/key.pem'),
    cert: fs.readFileSync('./server/config/ssl/cert.pem')
  }
  const secureServer = https.createServer(httpsOptions, app)
  secureServer.listen(SSLPORT, () => {console.log('Secure server running on port ' + SSLPORT)});
}

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
*/