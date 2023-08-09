import axios, { AxiosInstance } from "axios";
//import axiosRetry from 'axios-retry';
import errorHandler from './customErrors';
import axiosRetry from 'axios-retry';

import microservices from "../../data/services";


const createAxiosInstance = (serviceName: keyof typeof microservices | string, addPath?: boolean): AxiosInstance => {
  let url = 'http://localhost:' + microservices[serviceName].port;

  if (addPath) {url += microservices[serviceName].basePath};

  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  // interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  axiosRetry(instance, {
    retries: 3,
    retryDelay: (retryCount: number) => {
      console.log(`Retry attempt: ${retryCount}`);
      // waiting 2 seconds between each retry
      return 2000;
    },
    retryCondition: (error: any) => {
      // retrying only on 503 HTTP errors
      return error.response.status === 503;
    },
  });

  return instance;
};


export const authService = createAxiosInstance('auth', true);
export const apiService = createAxiosInstance('api', true);
