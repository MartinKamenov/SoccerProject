/* eslint max-len: ["error",  { "ignoreRegExpLiterals": true } ]*/
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
const Crypto = require('../models/crypto');
const flash = require('connect-flash');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUsername(username) {
    const re = /^[0-9A-Za-z\s\-]+$/;
    return re.test(username);
}

const configAuth = (app, database, registeredUser) => {
    passport.use(new Strategy({
            passReqToCallback: true,
        },
        (req, username, password, done) => {
            const email = req.body.email;

            if (!email) {
                // This is the Login, because no e-mail is sent
                const cryptoPassword = Crypto.encrypt(password).toString();
                return database.find('users', {
                        username: username,
                        password: cryptoPassword,
                    })
                    .then((users) => {
                        if (users.length < 1) {
                            return done(null, false, {
                                message: 'Wrong username or password',
                            });
                        } else if (users.length > 1) {
                            return done(null, false, {
                                message: 'Problem with duplicate user',
                            });
                        }
                        return done(null, users[0]);
                    })
                    .catch((ex) => {
                        return done(ex);
                    });
            }
            // Register module
            // const username = req.body.username;
            // const password = req.body.password;
            const repeatpassword = req.body.password_confirm;
            const posts = [];
            if (!password || !username || !email || !repeatpassword) {
                return done(null, false, {
                    message: 'All fields are required!',
                });
            }

            if (password !== repeatpassword) {
                return done(null, false, {
                    message: 'Passwords are not the same!',
                });
            }
            if (password.length < 4) {
                return done(null, false, {
                    message: 'Password must be at 4 characters long!',
                });
            }
            if (!validateEmail(email)) {
                return done(null, false, {
                    message: 'The e-mail is not valid',
                });
            }
            if (!validateUsername(username)) {
                return done(null, false, {
                    message: 'Username should be alphanumerical',
                });
            }
            return database.find('users', { 'username': username })
                .then((users) => {
                    if (users.length > 0) {
                        return done(null, false, {
                            message: 'Username is taken',
                        });
                    }
                    // Here hash newPassword before 
                    // input it in the database:
                    password = Crypto.encrypt(password).toString();
                    const newUser = { username, password, email, posts };
                    return database.insert('users', newUser)
                        .then(() => {
                            // const message = 'Successfully Registered';
                            done(null, newUser);
                        }).catch(() => {
                            const message = 'Some problem with registering';
                            done(message);
                        });
                })
                .catch((err) => {
                    const message = 'Some problem with users database';
                    done(message);
                });
        }
    ));

    app.use(session({
        secret: 'sessionSecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000000000,
        },
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        database.findById('users', id)
            .then((users) => {
                if (users.length < 1) {
                    return done('No such user found.----');
                } else if (users.length > 1) {
                    return done('There is more than one user with this id');
                }
                return done(null, users[0]);
            })
            .catch((ex) => done(ex));
    });
};

module.exports = configAuth;
