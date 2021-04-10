const arc = require('@architect/functions')

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const timestamp = new Date().toISOString();
  const connectionId = event.requestContext.connectionId;
  const message = JSON.parse(event.body);
  const text = `${timestamp} - Echoing ${message.text}`;

  await arc.ws.send({
    id: connectionId,
    payload: {text}
  });

  return {statusCode: 200};
}
