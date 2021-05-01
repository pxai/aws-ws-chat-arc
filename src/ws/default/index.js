const arc = require('@architect/functions')

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const timestamp = new Date().toISOString();
  const connectionId = event.requestContext.connectionId;
  const {channel, text, who, peers} = JSON.parse(event.body);
  who.connectionId = !who.connectionId ? connectionId : who.connectionId;
  who.login = event?.queryStringParameters?.login || who.login;
  const to = !peers ? [{...who}] : peers;
  const message = { timestamp, text, who };

  if (text === "askForPeers") {
    console.log("REQUESTING PEERS!!", channel, text, who, peers);
    await arc.ws.send({
      id: channel,
      payload: {message}
    });
  }

  if (text === "updateFromServer") {
    console.log("Server sends update", channel, text, who.login, peers);
  }

  to.forEach(async peer => {
    console.log("Server sends update to: ", peer.connectionId);
    await arc.ws.send({
      id: peer.connectionId,
      payload: {message}
    });
  });
  console.log("Server, sent> ", message, event.body);

  return {statusCode: 200};
}
