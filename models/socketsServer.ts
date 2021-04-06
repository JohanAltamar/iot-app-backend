import SocketIO from "socket.io";
import * as http from "http";

interface IPayload {
  deviceID:     string;
  deviceToken:  string;
  value:        any;
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

  sendMessage(data: IPayload) {
    const { deviceToken, ...rest } = data;
    this.io.to(data.deviceID).emit("message", rest);
  }
}

export default SocketsServer;
