let nama = "tono"
let temp = []
for (let i = 0; i < nama.length; i++) {
    temp.push(nama[i])
}
temp[0] = temp[0].toUpperCase()
nama = temp.join('')
console.log(nama);