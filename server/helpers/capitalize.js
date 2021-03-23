const capitalize = (word) => {
    if (word === "") {
        return ""
    } else {
        let temp = []
        // word = word.trim()
        for (let i = 0; i < word.length; i++) {
            temp.push(word[i])
        }
        temp[0] = temp[0].toUpperCase()
        let result = temp.join('')
        return result
    }
}

module.exports = capitalize