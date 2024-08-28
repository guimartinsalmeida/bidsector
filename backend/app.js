const express = require('express');
const cors = require('cors');
const router = require('./router'); 

const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use(router);

module.exports = app;
