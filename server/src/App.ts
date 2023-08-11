import express, { Application, Request, Response, NextFunction, Router } from 'express';
import session from 'express-session';
import http from 'http';
import https from 'https';
import osInfo from 'os';
import fs from 'file-system';
import Memory from 'memorystore';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { hostUrl } from './shared/utils/urls';

//Authentication
import passport from 'passport';
import '../config/passport';

import { ServiceConfig, ServiceMetadata } from './types/services'

import { mongooseConnect } from '../config/db';

const MemoryStore = Memory(session);

class App {

  private app: Application;
  private port: number;
  private router: Router;
  private server: http.Server | https.Server;
  public metadata: ServiceMetadata;
  
  constructor(config: ServiceConfig, metadata: ServiceMetadata) {

    const { port, router, staticPath } = config;

    this.app = express();
    this.port = port;
    this.router = router;
    this.metadata = metadata;

    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDB();

    //Build
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(staticPath ? staticPath : "client/build"));

      this.app.get("*", (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
      });
    }

    this.createServer(config);
  }

  private configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      res.setHeader('Access-Control-Allow-Origin', hostUrl);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });
    this.app.use(helmet());
    const corsOptions = {
      methods: ['GET', 'POST', 'PUT'],
      origin: hostUrl,
      credentials: true,
    };
    this.app.options('*', cors(corsOptions));
    this.app.set('trust proxy', 1);
    this.app.disable('x-powered-by');
    this.app.use(require('cookie-parser')());
    this.app.use(require('body-parser').urlencoded({ extended: false }));
    this.app.use(session({
      secret: 'kagwave',
      resave: false,
      saveUninitialized: true,
      rolling: true,
      cookie: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30,
      },
      store: new MemoryStore({})
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser(function(user: any, done: any){
      done(null, user);
    });

    passport.deserializeUser(function(user: any, done: any) {
      done(null, user);
    });
  }

  private configureRoutes() {
    const router = this.router; 
    this.app.use(router);
  }

  private connectDB() {
    mongooseConnect(process.env.ATLAS_URI!);
  }

  public createServer(options: ServiceConfig): void {
    const { ssl } = options;

    if (ssl && process.env.NODE_ENV !== "production" && process.env.DOCKER !== 'true') {
      const httpsOptions = {
        key: fs.readFileSync(ssl.key),
        cert: fs.readFileSync(ssl.cert)
      }
      this.server = https.createServer(httpsOptions, this.app);
    } else {
      this.server = http.createServer(this.app);
    }
  }
  
  public start(): void {
    this.server.listen(this.port, () => {
      console.log(`${this.metadata.name} service listening on port ${this.port}`);
    });
  }

  public stop(): void {
    this.server.close();
  }

}

export default App;