const express = require('express');
const pug = require('pug');
const playerRouter = require('./static/routes/players/player-route');
const auth = require('./static/routes/auth/auth-route');
const path = require('path');
const usersRoute = require('./static/routes/users/users-route');
const bodyParser = require('body-parser');
const Database = require('./database/mongodb');
const authConfig = require('./config/auth.config');
//const connectionString = 'mongodb://mk10:onetwotwo@ds145193.mlab.com:45193/footballproject';
const connectionString = 'mongodb://localhost/footballproject';

const database = new Database(connectionString);

//drops db
/*database.showAll('users').then((u) => {
    for (var i = 0; i < u.length; i++) {
        database.deleteAll('team/' + u[i].username);
    }
});
database.deleteAll('users');*/

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

authConfig(app, database);
playerRouter(app, database);
usersRoute(app, database);
auth(app, database);

app.listen(3001, () => {
    console.log('Magic is happening at 3001');
});
