const {Account} = require('../models')
const bcrypt = require('bcrypt')

class SessionController {
    static login (req, res) {
        let session = req.session.currentSession
        let query = req.query.err
        res.render('login', {query, session})
    }

    static checkAccount (req, res) {
        Account.findOne({
            where : {
                username : req.body.username
            }
        })
        .then (data => {
            let pwDB = data.password
            let pw = req.body.password
            const value = bcrypt.compareSync(pw, pwDB)
            if (data && value) {
               let cookie = {
                    id : data.id,
                    username : data.username,
                    name : data.name
                }
                console.log(cookie);
                req.session.currentSession = cookie
                res.render('login_complete', {cookie})
            } else {
                let fatal = "Wrong Username/Password"
                res.redirect(`/login?err=${fatal}`)
            }
        })
        .catch (err => {
            let fatal = "wrong username/password"
            res.redirect(`/login?err=${fatal}`)
        })
    }

    static logout (req, res) {
        let cookie = req.session.currentSession
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.render('logout_complete', {cookie})
            }
        })
    }

    static register (req, res) {
        let err = req.query.err
        if (err) {
            err = (req.query.err).split(',')
            err = err.join(', ')
        }
        console.log(err)
        res.render('register', {err})
    }
    
    static storeAccount (req, res) {
        let answer = {
            name : req.body.name,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password,
            reference : req.session.currentSession.id
        }
        Account.create(answer)
        .then(data => {
            res.render('register_complete', {answer})
        })
        .catch(err => {
            let errors = []
            err.errors.forEach (el => {
                errors.push(el.message)
            })
            res.redirect(`register?err=${errors}`)
        })
    }
}

module.exports = SessionController