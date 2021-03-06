'use strict';

const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
require('dotenv').config();

app.use(express.static('./src/public'));

httpServer.listen(process.env.PORT, () => {
  console.log('__SERVER_UP__', process.env.PORT);
});
