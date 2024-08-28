const express = require('express');
const router = require('./router'); 

const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(router);

module.exports = app;
