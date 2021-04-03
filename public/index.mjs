
const url = window.WS_URL;


const main = document.getElementsByTagName('main')[0];
const msg = document.getElementById('message');
let peers = [];

const ws = new WebSocket(url);

ws.onopen = open;
ws.onclose = close;
ws.onmessage = message;
ws.onerror = console.log;


function open(who) {
  const ts = new Date(Date.now()).toISOString();
  if (!peers.include(who)) peers.push(who);
  main.innerHTML = `<p><b><code>${ts} - opened</code></b></p>`;
}

function close(who) {
  peers = peers.filter(peer => peer !== who);
  main.innerHTML = '<a href=/>Reload</a>';
}

function message(e) {
  const { msg, who } = JSON.parse(e.data);
  main.innerHTML += `<p><b>${who}</b><code>${msg.text}</code></p>`;
}

msg.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({text, peers}));
  }
})
