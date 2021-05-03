const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {encoding} = require('../helpers/jwt')

class UserController {
    static login (req, res, next) {
        const {username, password} = req.body
        // console.log(username, password, '<<<<< uname dan pw');
        User.findOne({where: {username}})
        .then(data => {
            const check = bcrypt.compareSync(password, data.password)
                if (data && check) {
                    const access_token = encoding({id: data.id, username: data.username, name: data.name})
                    res.status(200).json({access_token})
                } else {
                    throw err
                }
        })
        .catch(err => {
            next({
                name: 'custom error',
                code: 400,
                message: 'invalid username/password'
            })
        })
    }
    
    static register (req, res, next) {
        const {username, password, name} = req.body
        User.create({username, password, name})
            .then(data => {
                res.status(201).json({
                    username: data.username,
                    password: data.password,
                    name: data.name
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController