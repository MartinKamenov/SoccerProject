const express = require('express');
const pug = require('pug');
const homeRouter = require('./static/routes/home-router');

const app = express();
app.set('view engine', 'pug');

homeRouter(app);

app.listen(3001, () => {
    console.log('Magic is happening at 3001');
})
