const { Router } = require('express');
const controller = require('./player-controller');

const attach = (app, database) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showPlayers(req, res);
        })
        .post('/', (req, res) => {
            controller.showPlayers(req, res);
        })
        .get('/:country/:position/:clubId/:id', (req, res) => {
            controller.showPlayer(req, res);
        })
        .post('/:country/:position/:clubId/:id', (req, res) => {
            controller.negotiatePlayer(req, res, database);
        });
    app.use('/', router);
};

module.exports = attach;
