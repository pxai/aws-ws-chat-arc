# AWS Basic WebSockets using ARC

An `echo` server using web sockets for Architect 8.x.

## Running locally

Install stuff:
```shell
npm install
```

Then:

```shell
arc sandbox
```

## Deployment
 add an `@aws` entry (https://arc.codes/reference/arc/aws) in your `.arc` file.
 Also be sure to update `src/http/get-index/get-web-socket-url.js` after your first deploy with real urls.
