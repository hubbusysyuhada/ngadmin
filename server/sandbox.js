let rawData = require('./data/Surat Keluar.json')
    rawData.forEach((surat, index) => {
      if (!surat.TanggalSurat) surat.TanggalSurat = rawData[index - 1].TanggalSurat
      if (!surat.Tujuan && !surat.Perihal) {
        surat.Tujuan = 'booked'
        surat.Perihal = 'booked'
      }
      surat.updatedAt = new Date()
      surat.createdAt = new Date()

      if (typeof surat.NomorSurat === 'number') {
        if (surat.NomorSurat < 10) {
          surat.NomorSurat = `0${surat.NomorSurat}`
        }
        let month = new Date(surat.TanggalSurat).getMonth() + 1
        const year = new Date(surat.TanggalSurat).getFullYear()
        if (month < 10) month = `0${month}`
        surat.NomorSurat = `S.${surat.NomorSurat}/REN/SUBDIT-PWAP/${month}/${year}`
        console.log(surat.NomorSurat, '<<<<');
      }
    })

console.log(typeof '03', '<<<<');