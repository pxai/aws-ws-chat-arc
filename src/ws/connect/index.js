/**
 * notes:
 * - verify event.headers.Origin to enforce same-origin
 * - non 200 response will disconnect the client socket
 */
exports.handler = async function ws(event) {
  console.log('ws-connect called with', event);
  const connectionId = event.requestContext.connectionId;
  if (event.queryStringParameters && Object.keys(event.queryStringParameters)) {
    const master = Object.keys(event.queryStringParameters)[0];
    console.log("We have MASTER: ", master);
  }

  return {statusCode: 200, connectionId};
}
