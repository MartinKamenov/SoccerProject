const { Router } = require('express');
const http = require('http');
const request = require("request");

const attach = function(app, database) {
    const router = new Router();
    router
        .get('/', (req, res) => {
            const page = req.query.page;
            request({
                url: 'http://www.easports.com/fifa/ultimate-team/api/fut/item?page=' + page + '&quality=bronze%2Crare_bronze%2Csilver%2Crare_silver%2Cgold%2Crare_gold',
                json: true
            }, async function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    const players = body.items;
                    res.status(200).render('players', { players });
                }
            });
        })
        .get('/:country/:id', (req, res) => {
            const name = req.params.name;
            const country = req.params.country;
            const id = req.params.id;
            request({
                url: 'http://www.easports.com/fifa/ultimate-team/api/fut/item?country=' + country +
                    '&quality=bronze%2Crare_bronze%2Csilver%2Crare_silver%2Cgold%2Crare_gold',
                json: true
            }, async function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    const players = body.items;
                    const player = players.find((p) => p.id == id);
                    if (player) {
                        console.log(player);
                        res.status(200).render('player', { player });
                    }
                }
            });
        });
    app.use('/', router);
};

module.exports = attach;
