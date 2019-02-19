const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  let username = req.body.user.username;
  let email = req.body.user.email;
  let password = req.body.user.password;

  User.create({

    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10)
  })
    .then(
      createSuccess = (user) => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

        res.json({
          user: user,
          message: 'user created',
          sessionToken: token
        })
      },
      createError = err => res.send(500, err)
    )
})

router.post('/signin', (req, res) => {
  User.findOne({ where: { email: req.body.user.email }})
    .then(
      user => {
        if (user) {
          bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
              res.json({
                user: user,
                message: 'successfully authenticated',
                sessionToken: token 
              })
            } else {
              res.status(502).send({ error: 'bad password' })
            }
          })
        } else {
          res.status(500).send({ error: 'user not found' })
        }
      },
      err => res.status(501).send({ error: 'failed to process'})
    )
})

module.exports = router