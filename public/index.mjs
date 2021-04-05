
const defaultUrl = window.WS_URL;

const main = document.getElementsByTagName('main')[0];
const login = document.getElementById('login');
const url = document.getElementById('url');
const msg = document.getElementById('message');
let peers = [];

let ws;

function openWebsocket (url=defaultUrl) {
  ws = new WebSocket(url);
  console.log("Opening: ", url);
  ws.onopen = open;
  ws.onclose = close;
  ws.onmessage = message;
  ws.onerror = console.log;
}

function open(who) {
  const ts = new Date(Date.now()).toISOString();
  // if (!peers.include(who)) peers.push(who);
  main.innerHTML = `<p><b><code>${ts} - opened</code></b></p>`;
}

function close(who) {
  peers = peers.filter(peer => peer !== who);
  main.innerHTML = '<a href=/>Reload</a>';
}

function message(e) {
  const msg = JSON.parse(e.data);
  const {timestamp, text, who} = msg.message;
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
    const url = e.target.value + "/?login=" + login.value;
    e.target.value = '';
    openWebsocket(url);
  }
})
