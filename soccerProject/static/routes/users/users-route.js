const { Router } = require('express');
const controller = require('./users-controller');
// const ObjectID = require('mongodb').ObjectID;
// const pageHandler = require('../paging/paging');

const attach = (app, db) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/:username', (req, res) => {
            controller.showUser(req, res, db);
        });

    app.use('/users', router);
};

module.exports = attach;
