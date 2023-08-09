import { Router } from "express";

interface ssl {
  cert: string,
  key: string,
}

export interface ServiceConfig {
  port: number;
  ssl: boolean | any;
  router: Router;
  staticPath?: string;
}

export interface ServiceMetadata {
  id: string,
  name: string,
}
