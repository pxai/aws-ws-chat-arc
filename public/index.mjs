
const defaultUrl = window.WS_URL;

const main = document.getElementsByTagName('main')[0];
const login = document.getElementById('login');
const url = document.getElementById('url');
const msg = document.getElementById('message');
const create = document.getElementById('create');
let peers = [];

let ws;

function openWebsocket (url=defaultUrl) {
  const finalUrl = `${url}/?login=${login.value}` ;
  console.log(">Opening!!! ", finalUrl, location.href);
  ws = new WebSocket(finalUrl);

  ws.onopen = open;
  ws.onclose = close;
  ws.onmessage = message;
  ws.onerror = console.log;
}

function open(event) {
  const timestamp = new Date().toISOString();
  const channel = url.value.split("?")[1] || "";
  const text = channel ? "givePeers" : "giveChannel";
  ws.send(JSON.stringify({login: login.value, channel, text}));
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

  if (text === "connect") {
    const msg = JSON.parse(event.data);
    const {timestamp, text, who} = msg.message;
    main.innerHTML = `<p><b><code>${timestamp} - opened channel: ${location.href}/?${who.connectionId}</code></b></p>`;
  }

  /*if (text === "connect") {
    console.log("New connected: ", who);
  }*/
  main.innerHTML += `<p><b>${who}&gt;</b> <code>${text}</code></p>`;
}

msg.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({text, peers}));
  }
})

url.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    url.style.display = 'none';
    const url = e.target.value + "/?login=" + login.value;
    e.target.value = '';
    openWebsocket(url);
  }
})

create.addEventListener('click', function(e) {
  create.style.display = 'none';
  url.style.display = 'none';
  console.log("Creating new ws");
    openWebsocket();
})
