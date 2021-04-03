import express from "express";
import cors from "cors";
import * as http from "http";
import SocketIO from "socket.io";

import authRoutes from "../routes/auth";
import userRoutes from "../routes/users";
import dbConnection from "../database/config";
import env from "../env.config";

class IoTServer {
  private port: string;
  private app: express.Application;
  private apiRoutes = {
    auth: "/api/auth",
    users: "/api/users",
  };
  private http: http.Server;
  private io: SocketIO.Server;

  constructor() {
    this.app = express();
    this.port = env.PORT || "3000";
    this.http = http.createServer(this.app);
    this.io = require("socket.io")(this.http, { origins: "*:*" });

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

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiRoutes.auth, authRoutes);
    this.app.use(this.apiRoutes.users, userRoutes);
  }

  listen() {
    this.http.listen(this.port, () => {
      console.log(`Server running on htpp://localhost:${this.port}`);
    });
    this.io.on("connect", () => {
      console.log("User connected");
    });
  }
}

export default IoTServer;
