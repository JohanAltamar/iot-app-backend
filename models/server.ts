import express, { Application } from "express";
import cors from 'cors';

import userRoutes from "../routes/users";
import dbConnection from "../database/config";
import env from "../env.config";

class Server {
  private app: Application;
  private port: string;
  private apiRoutes = {
    users: "/api/users",
  };

  constructor() {
    this.app = express();
    this.port = env.PORT || "3000";

    // Start database connection
    this.connectDatabase();

    // Middlewares
    this.middlewares();

    // Routes Definition
    this.routes();
  }

  async connectDatabase() {
    await dbConnection();
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiRoutes.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on htpp://localhost:${this.port}`);
    });
  }
}

export default Server;
