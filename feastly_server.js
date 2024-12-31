const http = require('http');
const app  = require('./express_connection')
const portJson = require('./middleware/port_number.json');


var httpServer = http.createServer(app)


httpServer.listen(portJson.port,()=>{
   console.log('connected to port',portJson.port);
})