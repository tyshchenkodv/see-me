const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

app.use(cors());
app.use('/', router);

module.exports = app;
