const express = require('express');

const app = express();



const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended:false});

const appController = require('./controllers/appController');

app.set('view engine', 'ejs');

app.use('/assets',express.static('assets'));

app.use('/scripts',express.static('scripts'));

appController(app,urlencodedParser);

app.listen(3000);
