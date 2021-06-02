// let rawData = require('./data/Surat Keluar.json')
//     rawData.forEach((surat, index) => {
//       if (!surat.TanggalSurat) surat.TanggalSurat = rawData[index - 1].TanggalSurat
//       if (!surat.Tujuan && !surat.Perihal) {
//         surat.Tujuan = 'booked'
//         surat.Perihal = 'booked'
//       }
//       surat.updatedAt = new Date()
//       surat.createdAt = new Date()

//       if (typeof surat.NomorSurat === 'number') {
//         if (surat.NomorSurat < 10) {
//           surat.NomorSurat = `0${surat.NomorSurat}`
//         }
//         let month = new Date(surat.TanggalSurat).getMonth() + 1
//         const year = new Date(surat.TanggalSurat).getFullYear()
//         if (month < 10) month = `0${month}`
//         surat.NomorSurat = `S.${surat.NomorSurat}/REN/SUBDIT-PWAP/${month}/${year}`
//         console.log(surat.NomorSurat, '<<<<');
//       }
//     })

// console.log(typeof '03', '<<<<');

// let rawData = require('./data/SPT Keluar.json')
//     for (let i = 0; i < rawData.length; i++) {
//       let spt = rawData[i]
//       spt.createdAt = new Date()
//       spt.updatedAt = new Date()
//       if (spt.Ditujukan) {
//         let tempArr = spt.Ditujukan.split(',')
//         spt.Ditujukan = tempArr.map(name => name.trim())
//         spt.Ditujukan = JSON.stringify(spt.Ditujukan)
//       }
      
//       if (!spt.TanggalSurat) {
//         spt.TanggalSurat = rawData[i - 1].TanggalSurat
//       }

//       if (typeof spt.NomorSurat === 'number') {
//         let temp = new Date(spt.TanggalSurat).toLocaleString().split(',')[0].split('/') // month - day - year
//         if (spt.NomorSurat < 10) spt.NomorSurat = `0${spt.NomorSurat}`
//         if (temp[0] < 10) temp[0] = `0${temp[0]}`
//         spt.NomorSurat = `ST.${spt.NomorSurat}/REN/SUBDIT-PWAP/${temp[0]}/${temp[2]}`
//         spt.Ditujukan = 'booked'
//         spt.DalamRangka = 'booked'
//         spt.Waktu = 'booked'
//         spt.Tempat = 'booked'
//       }  
//     }

console.log(new Date().toLocaleDateString().split('/').join(''));