const express = require('express');
const pug = require('pug');
const homeRouter = require('./static/routes/home-router');
const path = require('path');
const Database = require('./database/mongodb');
//const connectionString = 'mongodb://mk10:onetwotwo@ds145193.mlab.com:45193/footballproject';
const connectionString = 'mongodb://localhost/footballproject';

const database = new Database(connectionString);

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '\\views');
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));

homeRouter(app, database);

app.listen(3001, () => {
    console.log('Magic is happening at 3001');
});
