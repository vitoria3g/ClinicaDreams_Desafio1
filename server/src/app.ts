import express from 'express';
import routes from './routes';
import cors from 'cors';

class AppController {
  
  public express: express.Application;

  public constructor(){
    this.express = express();
    this.middlwares();
    this.useCors();
    this.routes();
  }

  private middlwares(){
    this.express.use(express.json());
  }
  
  private routes(){
    this.express.use(routes);
  }

  private useCors(){
    this.express.use(cors());
  }
}

export default new AppController().express;