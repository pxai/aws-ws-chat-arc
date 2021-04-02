
const url = window.WS_URL;


const main = document.getElementsByTagName('main')[0];
const msg = document.getElementById('message');


const ws = new WebSocket(url)
ws.onopen = open;
ws.onclose = close;
ws.onmessage = message;
ws.onerror = console.log;

function open() {
  const ts = new Date(Date.now()).toISOString();
  main.innerHTML = `<p><b><code>${ts} - opened</code></b></p>`;
}

function close() {
  main.innerHTML = 'Closed <a href=/>reload</a>';
}

function message(e) {
  const msg = JSON.parse(e.data);
  main.innerHTML += `<p><code>${msg.text}</code></p>`;
}

msg.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    const text = e.target.value;
    e.target.value = '';
    ws.send(JSON.stringify({text}));
  }
})
