const { Router } = require('express');
const http = require('http');
const request = require("request");

const attach = function(app) {
    const router = new Router();
    router
        .get('/', (req, res) => {
            request({
                url: 'http://www.easports.com/fifa/ultimate-team/api/fut/item?page=1',
                json: true
            }, function(error, response, body) {

                if (!error && response.statusCode === 200) {
                    const players = body.items;
                    res.status(202).render('players', { players });
                }
            });
        });
    app.use('/', router);
};

module.exports = attach;
