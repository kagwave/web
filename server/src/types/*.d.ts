declare module 'file-type-cjs';

declare module 'ws';

declare module 'express-session';
declare module 'cors';
declare module 'uuid';
declare module 'file-system';

declare module 'passport';
declare module 'bcryptjs';

declare module 'nodemailer';
declare module 'mysql';
declare module 'fb';
declare module 'memorystore';
declare module 'fb';

declare module 'file-system';


declare module 'express' {
  interface Request {
    user?: any,
    account?: any,
    logOut?: any,
    logIn?: any
  }
}


type kagwaveId = string;