const express = require('express');
const feedbackHandler = require('./feedback');
const quoteHandler = require('./quote');

const app = express();

app.get('/quote', quoteHandler);

app.get('/feedback', feedbackHandler);

app.listen(8080);
