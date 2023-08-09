import mongoose from 'mongoose';
import AWS from 'aws-sdk';

import { ConnectOptions } from 'mongoose';

//MongoDB
const mongooseConnect = (uri: string, options?: ConnectOptions) => {
  if (!options) {
    options = { 
      keepAlive: true, 
      keepAliveInitialDelay: 300000 
    }
  }
  mongoose.set('strictQuery', false)
  mongoose.connect(uri!, options);
  const connection = mongoose.connection;
  connection.once('open', () => {console.log("MongoDB database connection established successfully");});
}


export { mongooseConnect };