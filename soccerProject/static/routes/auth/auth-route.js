const { Router } = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'soccerProject/public/css/images/profile' });
const controller = require('./auth-controller');


const attach = (app, db) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/login', (req, res) => {
            controller.showLogin(req, res);
        })
        .post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        }))
        .get('/register', (req, res) => {
            controller.showRegister(req, res);
        })
        .post('/register', passport.authenticate('local', {
            successRedirect: '/auth/profilePicture',
            failureRedirect: '/auth/register',
            failureFlash: true,
        }))
        .get('/logout', (req, res) => {
            controller.logout(req, res);
        })
        .get('/profilePicture', (req, res) => {
            controller.pictureSettings(req, res, app);
        })
        .post('/profilePicture', upload.any(), (req, res) => {
            controller.changePicture(req, res, db);
        });

    app.use('/auth', router);
};

module.exports = attach;
