
const defaultUrl = window.WS_URL;

const main = document.getElementsByTagName('main')[0];
const loginInput = document.getElementById('login');
const urlInput = document.getElementById('url');
const msg = document.getElementById('message');
const create = document.getElementById('create');
let peers = [];
let isMaster = false;

let ws;

function openWebsocket (url=defaultUrl) {
  const finalUrl = `${url}/?login=${loginInput.value}&channel=${urlInput.value}` ;
  console.log(">Opening!!! ", finalUrl, location.href);
  ws = new WebSocket(url);

  ws.onopen = open;
  ws.onclose = close;
  ws.onmessage = message;
  ws.onerror = console.log;
}

function open(event) {
  const timestamp = new Date().toISOString();
  const channel = urlInput.value || "";
  const text = channel ? "giveChannel" : "givePeers";
  console.log("OPEN> ", loginInput.value, channel, text);
  ws.send(JSON.stringify({login: loginInput.value, channel, text}));
  main.innerHTML = `<p><b><code>${timestamp} - opened channel!</code></b></p>`;
}

function close(e) {
  peers = peers.filter(peer => peer !== who);
  main.innerHTML = '<a href=/>Reload</a>';
}

function message(event) {
  console.log("MESSAGE: ", event);
  const msg = JSON.parse(event.data);
  const {timestamp, text, who} = msg.message;

  if (text == "giveChannel") {
    main.innerHTML += `<p><b><code>${timestamp}:${text}- announce channel: ${location.href}?${who.connectionId}</code></b></p>`;
  }

  /*if (text === "connect") {
    console.log("New connected: ", who);
  }*/
  main.innerHTML += `<p><b>${who.login}&gt;</b> <code>${text}</code></p>`;
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
    //const [host, channel] = e.target.value.split("?");

    //const url = `${e.target.value}&login=${loginInput.value}&channel=${channel}`;

    e.target.value = '';
    openWebsocket();
  }
})

create.addEventListener('click', function(e) {
  create.style.display = 'none';
  url.style.display = 'none';
  console.log("Creating new ws");
  isMaster = true;
  openWebsocket();
})
