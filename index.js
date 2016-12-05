const express = require('express');
const bodyParser = require('body-parser');

const feedbackHandler = require('./routesHandlers/feedback');
const quoteHandler = require('./routesHandlers/quote');
const logHandler = require('./routesHandlers/log');

const debugMiddleware = require('./middlewares/debug');

const app = express();

app.use(bodyParser.json());
app.use(debugMiddleware);

app.post('/quote', quoteHandler);
app.post('/feedback', feedbackHandler);
app.get('/log', logHandler);

app.listen(8080);
