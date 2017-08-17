const controller = {
    showLogin(req, res) {
        return res.render('login', { message: req.flash('error') });
    },
    showRegister(req, res) {
        const user = req.user;
        if (user) {
            // const message = 'You are allready signed in.';
            res.render('register', { message: req.flash('error') });
        } else {
            res.render('register', { message: req.flash('error') });
        }
    },
    logout(req, res) {
        req.logout();
        res.redirect('/');
    },
    pictureSettings(req, res, app) {
        const user = req.user;
        if (user) {
            res.render('picture', { user });
        } else {
            const message = 'You should be register, to upload picture.';
            res.render('404', { user, message });
        }
    },
    changePicture(req, res, db) {
        const user = req.user;
        if (!user) {
            res.redirect('/auth/login');
        }
        if (req.files.length > 0) {
            db.find('users', { username: user.username })
                .then((users) => {
                    const changingUser = users[0];
                    changingUser.pictureName = req.files[0].filename;
                    db.update('users', {
                            username: user.username,
                        }, changingUser)
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch(() => {
                            const message = 'Problem with database...';
                            res.render('404', { message });
                        });
                });
        } else {
            res.redirect('/');
        }
    },
};

// @ts-ignore
module.exports = controller;
