const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const nnewUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            req.session.userId = newUser.id;

            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        const correctPassword = user.checkPassword(req.body.password);

        if(!correctPassword) {
            res.status(400).json({ message: 'Incorrect password.' });
            return;
        }

        if(!user) {
            res.status(400).json({ message: 'No account found with that username.'});
            return;
        }

        req.session.save(() => {
            req.session.username = user.username;
            req.session.loggedIn = true;
            req.session.userId = user.id;

            res.json({ user, message: 'Login successful.' });
        });
    } catch (err) {
        res.status(400).json({ message: 'Unable to login.'});
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;