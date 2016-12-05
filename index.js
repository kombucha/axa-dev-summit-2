const express = require('express');
const bodyParser = require('body-parser');
const feedbackHandler = require('./feedback');
const quoteHandler = require('./quote');
const logHandler = require('./log');

const app = express();

app.use(bodyParser.json());

app.post('/quote', quoteHandler);

app.post('/feedback', feedbackHandler);

app.get('/logs', logHandler);

app.listen(8080);
