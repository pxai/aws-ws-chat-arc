import User from "./user.js";
import Messages from "./messages.js";
import EventEmitter from "./events.js";

export default class Websocket extends EventEmitter {
  constructor(host=window.WS_URL) {
    super();
    this._host = host;
    this.channel = null;
    this.peers = new Map();
  }

  _initConnection(host) {
    this.ws = new WebSocket(host);

    this.ws.onopen = this.open.bind(this);
    this.ws.onclose = this.close.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = console.log;
  }

  create(login) {
    this.me = { login };
    console.log("WS> Lets create: ", login, this._host);
    this._initConnection(this._host);
  }

   open(login, channel = "") {
    //this._initConnection(this._host + "/?" + channel);
    const text = channel === "" ? "giveChannel" : "updatePeers";
    console.log("WS> Open!!! ", this._host, login, channel, text);
    this.channel = channel;
    this.ws.send(JSON.stringify({login, channel, text}));
  }

  onMessage(event) {
    const msg = JSON.parse(event.data);
    const {timestamp, text, who} = msg.message;
    console.log("WS > message received: ", who, text);
    let formattedMsg = "";

    if (text === "giveChannel") {
      this.me = { ...this.me, connectionId: who.connectionId };
      this.channel = who.connectionId;
      this.peers.set(who.connectionId, who);
      console.log("WS> Give Channel ", this.me, who, this.peers);
      formattedMsg = `<code>${timestamp}:${text}- announce channel: ${this.channel}</code>`;
      this.emit("ws-msg", {who: this.me, channel: this.channel, text: formattedMsg})
    } else if (text === "updatePeers") {
      this.peers.set(who.connectionId, who);
      console.log("WS> Update peers ", who, this.peers);
      this.ws.send(JSON.stringify({login: who, channel: this.channel, peers: this.peers.entries(), text: "updateFromServer"}));
      formattedMsg = `<code>${text}</code>`;
      this.emit("ws-msg", {who: this.me, channel: this.channel, text: formattedMsg})
    } else {
      formattedMsg = `<code>${text}</code>`;
      this.emit("ws-msg", {who, channel: this.channel, text: formattedMsg })
    }
  }

  sendMessage(login, channel, text) {
    this.ws.send(JSON.stringify({login: this.me, channel, text}));
  }

  close(login) {
    console.log("WS> Close!!! ", this._host, login);
  }
}
