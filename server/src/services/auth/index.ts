import { ServiceConfig, ServiceMetadata } from "../../types/services";
import App from "../../App";
import router from './routes/*';

let options: ServiceConfig = {
  port: 8200,//9090,
  ssl: null/*{
    key: './config/SSL/key.pem',
    cert: './config/SSL/cert.pem'
  }*/,
  router: router,
}

let metadata: ServiceMetadata = {
  id: 'adsfjasdfa',
  name: 'Auth',
}

const microservice = new App(options, metadata);

export default microservice;
