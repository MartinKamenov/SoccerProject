const { Router } = require('express');

const attach = function(app) {
    const router = new Router();
    router
        .get('/', (req, res) => {
            res.render('home');
        });
    app.use('/', router);
};

module.exports = attach;
