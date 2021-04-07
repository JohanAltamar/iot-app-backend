import SocketIO from "socket.io";
import * as http from "http";
import { validateDeviceToken } from "../helpers/tokens";

interface IPayload {
  deviceID: string;
  deviceToken: string;
  value: any;
}

class SocketsServer {
  public io: SocketIO.Server;

  constructor(http: http.Server) {
    this.io = require("socket.io")(http, { origins: "*:*" });

    this.startSocketsServer();
  }

  startSocketsServer() {
    this.io.on("connect", (socket: SocketIO.Socket) => {
      const rooms = socket.handshake.auth.devicesIDs;
      // console.log("User connected, rooms:", socket.handshake.auth.devicesIDs);
      rooms.forEach((room: string) => {
        socket.join(room);
      });
    });
  }

  async sendMessage(data: IPayload) {
    const { deviceToken, ...rest } = data;
    const validToken = await validateDeviceToken(deviceToken, rest.deviceID);
    if (validToken) {
      this.io.to(data.deviceID).emit("message", rest);
    }
  }
}

export default SocketsServer;
