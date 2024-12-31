const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')

const dbJson = require('./middleware/mongodb_config.json')

const serverVersion = require('./middleware/version.json') 


app.use(bodyParser.json({limit: '1gb',extended: true}));
app.use(bodyParser.urlencoded({limit: '1gb', extended: true}));
app.use(cors())  
app.use(helmet());

const options = { 
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
   // sslValidate: false,
    //auto_reconnect: true, 
   autoIndex: true,
   // sslCert: certFileBuf
}; 

try{

     const url = 'mongodb+srv://'+ dbJson.user +':'+ dbJson.password +'@'+ dbJson.url +'/'+ dbJson.database +'?authSource=admin&replicaSet='+ dbJson.replica +'&tls=true';
    // var url = 'mongodb://'+ dbJson.user +':'+ dbJson.password +'@'+ dbJson.url+'/'+dbJson.database;

    // var url = 'mongodb://'+ dbJson.user +':'+ dbJson.password +'@'+ dbJson.url +'/'+ dbJson.database;
    var conn = mongoose.connect(url,options) 
      .then((result)=> console.debug('connected to db'))
      .catch((err)=>console.log(err))

    }
    catch(e){
        console.log(e);
    }

    const dashUsersRoutes = require('./routes/dash_user_route');
    const inventoryRoutes = require('./routes/inventory_route');

    app.use('/api/'+serverVersion.version+'/dashusers',dashUsersRoutes);
    app.use('/api/'+serverVersion.version+'/inventory',inventoryRoutes);

    module.exports = app;