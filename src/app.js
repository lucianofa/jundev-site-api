import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import morgan from 'morgan';
import 'dotenv/config';
import 'express-async-errors';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(morgan('dev'));
    this.server.use(cors());
    this.server.use(express.json());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
