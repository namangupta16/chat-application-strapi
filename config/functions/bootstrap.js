

module.exports = () => {
    const WebSocket = require('ws');
    // @ts-ignore
    const strapi = require('strapi');
  
    const wss = new WebSocket.Server({ port: 8080 });
  
    wss.on('connection', ws => {
      ws.on('message', message => {
        console.log(`Received message => ${message}`);
        ws.send(`Echo: ${message}`);
      });
    });
  
    strapi.app.use((ctx, next) => {
      ctx.wss = wss;
      return next();
    });
  };
  