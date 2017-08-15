const express = require('express');
const pug = require('pug');
const homeRouter = require('./static/routes/home-router');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '\\views');
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));

homeRouter(app);

app.listen(3001, () => {
    console.log('Magic is happening at 3001');
});
