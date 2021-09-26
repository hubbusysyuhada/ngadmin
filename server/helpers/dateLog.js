const dateLog = () => {
    return new Date().toLocaleString('fr-FR', {timeZone: 'Asia/Jakarta'}).split(' à ').join(' ')
}

module.exports = dateLog