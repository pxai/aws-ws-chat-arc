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
    console.log("WS> Lets create: ", login, this._host);
    this._initConnection(this._host);

    // this.emit("ws-open", login);
  }

   open(login, channel) {
     console.log("WS> Open!!! ", this._host, login, channel);
    //this._initConnection(this._host + "/?" + channel);
    const text = channel === "" ? "giveChannel" : "updatePeers";
    this.ws.send(JSON.stringify({login, channel, text}));
    // this.emit("ws-open", login, channel);
  }

  onMessage(event) {
    console.log("WS > message received: ", event, event.data);
    const msg = JSON.parse(event.data);
    const {timestamp, text, who} = msg.message;
    let formattedMsg = "";

    if (text == "giveChannel") {
      this.me = who;
      this.peers.set(who.connectionId, who);
      formattedMsg = `<p><b><code>${timestamp}:${text}- announce channel: ${location.href}?${who.connectionId}</code></b></p>`;
    }

    if (text === "updatePeers") {
      this.peers.set(who.connectionId, who);
      console.log("New connected: ", who, this.peers);
      ws.send(JSON.stringify({login: who, channel: urlInput.value, peers: this.peers.entries(), text: "updateFromServer"}));
    }
    formattedMsg += `<p><b>${who.login}&gt;</b> <code>${text}</code></p>`;
    this.emit("ws-msg", {login: "sample", channel: "CHAN", text: formattedMsg})

  }

  sendMessage(login, channel, text) {
    this.ws.send(JSON.stringify({login, channel, text}));
  }

  close(login) {
    console.log("WS> Close!!! ", this._host, login);
    // this.emit("ws-close", login);
  }

}
