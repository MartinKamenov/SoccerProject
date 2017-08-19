const controller = {
    showUser(req, res, db) {
        const user = req.user;
        const username = req.params.username;
        console.log(username);
        db.find('users', { username: username }).then((users) => {
                const foundUser = users[0];
                if (!foundUser) {
                    const message = 'There was a problem finding the user.';
                    res.status(404).render('404', { user, message });
                } else {
                    db.showAll('team/' + username).then((teams) => {
                        const squad = teams[0].squad;
                        console.log(squad);
                        squad.sort(function(a, b) {
                            return b.rating - a.rating;
                        });
                        if (user && user.username === username) {
                            res.render('profile', {
                                user,
                                foundUser,
                                squad,
                                isMine: true,
                            });
                        } else {
                            res.render('profile', {
                                user,
                                foundUser,
                                squad,
                                isMine: false,
                            });
                        }
                    });
                }
            })
            .catch(() => {
                const message = 'There was a problem finding the user.';
                res.status(404).render('404', { user, message });
            });
    }
};

// @ts-ignore
module.exports = controller;
