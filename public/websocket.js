import User from "./user.js";
import Messages from "./messasges.js";

export default class WebSocket {
  constructor(url=window.WS_URL, login, channel) {
    this.finalUrl = `${url}/?login=${login}&channel=${channel}`;
    this._initConnection();
  }

  _initConnection() {
    this.ws = new WebSocket(finalUrl);

    this.ws.onopen = this.open;
    this.ws.onclose = this.close;
    this.ws.onmessage = this.message;
    this.ws.onerror = console.log;
  }

   open(event) {
      const timestamp = new Date().toISOString();
      const channel = urlInput.value || "";
      const text = channel === "" ? "giveChannel" : "updatePeers";
      const user = new User(loginInput.value);
      console.log("OPEN> Login: ", loginInput.value, " Channel: ", channel, " Message: ", text);
      ws.send(JSON.stringify({login: loginInput.value, channel, text}));
      main.innerHTML = `<p><b><code>${timestamp} - opened channel!</code></b></p>`;
  }

  function message(event) {
    console.log("MESSAGE: ", event);
    const msg = JSON.parse(event.data);
    const {timestamp, text, who} = msg.message;

    if (text == "giveChannel") {
      me = who;
      peers.set(who.connectionId, who);
      main.innerHTML += `<p><b><code>${timestamp}:${text}- announce channel: ${location.href}?${who.connectionId}</code></b></p>`;
    }

    if (text === "updatePeers") {
      peers.set(who.connectionId, who);
      console.log("New connected: ", who, peers);
      ws.send(JSON.stringify({login: who, channel: urlInput.value, peers: peers.entries(), text: "updateFromServer"}));
    }
    main.innerHTML += `<p><b>${who.login}&gt;</b> <code>${text}</code></p>`;
  }

  close(e) {
    peers.delete(me.connectionId)
    main.innerHTML = '<a href=/>Reload</a>';
  }
}








msg.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({text, peers}));
  }
})

urlInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    urlInput.style.display = 'none';
    create.style.display = 'none';
    //const [host, channel] = e.target.value.split("?");

    //const url = `${e.target.value}&login=${loginInput.value}&channel=${channel}`;
    openWebsocket();
  }
})

create.addEventListener('click', function(e) {
  create.style.display = 'none';
  urlInput.style.display = 'none';
  console.log("Creating new ws");
  isMaster = true;
  openWebsocket();
})
