const session = (req, res, next) => {
    let account = req.session.currentSession
    if (account) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = session