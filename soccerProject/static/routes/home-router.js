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
        .get('/:country/:position/:clubId/:id', (req, res) => {
            const quality = req.params.quality;
            const country = req.params.country;
            const position = req.params.position;
            const clubId = req.params.clubId;
            const id = req.params.id;
            request({
                url: 'http://www.easports.com/fifa/ultimate-team/api/fut/item?country=' + country +
                    '&club=' + clubId + '&position=' + position +
                    '&quality=bronze%2Crare_bronze%2Csilver%2Crare_silver%2Cgold%2Crare_gold',
                json: true
            }, async function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    const players = body.items;
                    var player = players.find((p) => p.baseId == id);
                    if (player) {
                        console.log(player);
                        res.status(200).render('player', { player });
                    } else {
                        res.status(404).send('Player was not found');
                    }
                }
            });
        });
    app.use('/', router);
};

module.exports = attach;
