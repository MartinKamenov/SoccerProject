const http = require('http');
const request = require("request");
const paging = require('./../../../models/paging');
const pricing = require('./../../../models/pricing');

const controller = {
    showPlayers(req, res) {
        const user = req.user;
        const body = req.body;
        var addition = '';
        var page = paging.choosePage(req.query.page);
        if (body) {
            if (body.position) {
                addition += '&position=' + body.position;
            }
            if (body.name) {
                addition += '&name=' + body.name;
            }
            if (body.page) {
                page = paging.choosePage(body.page);
            }
            if (body.country) {
                addition += '&country=' + body.country;
            }
        }
        request({
            url: 'http://www.easports.com/fifa/ultimate-team/api/fut/item?page=' + page + '&quality=bronze%2Crare_bronze%2Csilver%2Crare_silver%2Cgold%2Crare_gold' +
                addition,
            json: true
        }, async function(error, response, body) {
            if (!error && response.statusCode === 200) {
                const players = body.items;
                const totalPages = body.totalPages;
                const showPages = [];
                if (page > 1 && page < totalPages) {
                    showPages.push(page - 1, page, page + 1);
                } else if (page === 1 && totalPages > 2) {
                    showPages.push(page, page + 1, page + 2);
                } else if (page === totalPages && totalPages > 2) {
                    showPages.push(page - 2, page - 1, page);
                } else {
                    for (let j = 1; j <= totalPages; j += 1) {
                        showPages.push(j);
                    }
                }
                res.status(200).render('players', { user, showPages, players, totalPages, page });
            }
        });
    },
    showPlayer(req, res) {
        const user = req.user;
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
                    const price = pricing.choosePrice(player.rating, player.position, player.age);
                    res.status(200).render('player', { user, player, price });
                } else {
                    res.status(404).send('Player was not found');
                }
            }
        });
    },
    negotiatePlayer(req, res, database) {
        console.log('here')
        const user = req.user;
        if (!user) {
            res.redirect('404');
        }
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
                    database.showAll('team/' + user.username).then((teams) => {
                        const team = teams[0];
                        var samePlayer = team.squad.find((p) => p.baseId == player.id);
                        if (samePlayer) {
                            res.render('404', { message: 'Player already in the squad' });
                        } else {
                            team.squad.push(player);
                            database.update('team/' + user.username, {}, team);
                        }
                    });
                    res.redirect('/');
                } else {
                    res.status(404).send('Player was not found');
                }
            }
        });
    }
};
// @ts-ignore
module.exports = controller;
