import mqtt, { Client } from "mqtt";
import SocketsServer from './socketsServer';
import * as http from "http";

class MqttClient {
  private client: Client;
  private socketServer: any;

  constructor(http: http.Server) {
    this.client = mqtt.connect("mqtt://broker.hivemq.com");
    this.socketServer = new SocketsServer(http);

    this.startMqttClient();
  }

  startMqttClient() {
    this.client.on("connect", () => {
      this.client.subscribe("johanaltro/iot", (err) => {
        // if (!err) {
        //   this.client.publish("johanaltro/iot", JSON.stringify({msg: "hola"}));
        // }
      });
    });

    this.client.on("message", (topic, message) => {
      // message is Buffer
      const msg = message.toString();
      let data;

      try {
        data = JSON.parse(msg)
      } catch (error) {
        // console.log("INVALID JSON FORMAT")
      }

      if(data?.deviceID){
        this.socketServer.sendMessage(data)
      }
    });
  }

  endMqttClient() {
    this.client.end();
  }
}

export default MqttClient;
