const arc = require('@architect/functions')

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const timestamp = new Date().toISOString();
  const connectionId = event.requestContext.connectionId;
  const {channel, text, login, peers} = JSON.parse(event.body);
  const message = { timestamp, text, who: { connectionId, login } };

  if (text === "updatePeers") {
    console.log("REQUESTING PEERS!!", channel, text, login);
    await arc.ws.send({
      id: channel,
      payload: {message}
    });
  }

  if (text === "updateFromServer") {
    console.log("Server sends update", channel, text, login, peers);
  }

  await arc.ws.send({
    id: connectionId,
    payload: {message}
  });
  console.log("Server, sent> ", message);

  return {statusCode: 200};
}
