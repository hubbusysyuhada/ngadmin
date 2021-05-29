const {SPTKeluar} = require('../models')
const {changeDateFormat} = require('../helpers/changeDateFormat')

class SPTKeluarController {
    static async fetchAll (req, res, next) {
        try {
            const {year} = req.headers
            const response = await SPTKeluar.findAll({order: [['id', 'ASC']]})
            let temp = response.filter(spt => spt.TanggalSurat.includes(year))
            temp.forEach(spt => {
                spt.sortingDate = new Date(spt.TanggalSurat)
                if (spt.Ditujukan && spt.Ditujukan !== 'booked') spt.Ditujukan = JSON.parse(spt.Ditujukan)
            });
            temp = temp.sort((a,b) => a.sortingDate < b.sortingDate ? -1 : 0)
            res.status(200).json(temp)
        } catch (error) {
            console.log(error, '<<< error');
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }
    
    static async fetchOne (req, res, next) {
        try {
            const {id} = req.params
            let response = await SPTKeluar.findByPk(+id)
            if (response.Ditujukan) response.Ditujukan = JSON.parse(response.Ditujukan)
            res.status(200).json(response)
        } catch (error) {
            console.log(error, '<<< error');
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async editOne (req, res, next) {
        try {
            const {id} = req.params
            let answer = {
                TanggalSurat: req.body.TanggalSurat,
                NomorSurat: req.body.NomorSurat,
                Ditujukan: req.body.Ditujukan,
                DalamRangka: req.body.DalamRangka,
                Waktu: req.body.Waktu,
                Tempat: req.body.Tempat,
                File: req.body.File,
                PenyusunKonsep: req.body.PenyusunKonsep
            }
            if (answer.Ditujukan && answer.Ditujukan !== 'booked') {
                answer.Ditujukan = answer.Ditujukan.split(',')
                answer.Ditujukan = answer.Ditujukan.map(name => name.trim())
                answer.Ditujukan = JSON.stringify(answer.Ditujukan)
            }
            const response = await SPTKeluar.update(answer, {where: {id}, returning: true})
            res.status(200).json(response)
        } catch (error) {
            console.log(error, '<<< error')
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async newSPT (req, res, next) {
        try {
            const last = await SPTKeluar.findAll({order: [['id', 'DESC']], limit: 1})
            let lastNumber = last[0].NomorSurat
            let newNumber;
            if (isNaN(+lastNumber)) {
                let temp = lastNumber.split('/')
                temp[0] = temp[0].split('.')
                newNumber = +temp[0][1] + 1
            } else {
                newNumber = +lastNumber + 1
            }

            if (newNumber < 10) newNumber = "0" + newNumber
            let answer = {
                TanggalSurat: req.body.TanggalSurat,
                NomorSurat: '',
                Ditujukan: req.body.Ditujukan,
                DalamRangka: req.body.DalamRangka,
                Waktu: req.body.Waktu,
                Tempat: req.body.Tempat,
                File: req.body.File,
                PenyusunKonsep: req.body.PenyusunKonsep
            }
            if (!answer.TanggalSurat) throw({
                name: 'custom error',
                code: 400,
                message: 'bad request'
            })
            const formattedDate = changeDateFormat(answer.TanggalSurat)
            answer.NomorSurat = `ST.${newNumber}/REN/SUBDIT-PWAP/${formattedDate.month}/${formattedDate.year}`
            const response = await SPTKeluar.create(answer)
            res.status(201).json(response)
        } catch (error) {
            console.log(error, '<<< error')
            if (error) next(error)
            else next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }
    
    static async bookSPT (req, res, next) {
        try {
            let {ammount, TanggalSurat} = req.body
            const formattedDate = new Date(`${TanggalSurat} 12:00:00`)
            const year = formattedDate.getFullYear()
            let month = formattedDate.getMonth()  + 1
            const months = ['Januari', 'Februari', 'Maret', 'April', 'May', 'Juni', 'Juli', 'August', 'September', 'October', 'November', 'December']
            TanggalSurat = `${formattedDate.getDate()} ${months[month - 1]} ${year}`
            if (month < 10) month = '0' + month
            const last = await SPTKeluar.findAll({order: [['id', 'DESC']], limit: 1})
            let lastNumber = last[0].NomorSurat
            if (isNaN(+lastNumber)) {
                let temp = lastNumber.split('/')
                temp[0] = temp[0].split('.')
                lastNumber = +temp[0][1]
            }
            let answer = []
            for (let i = 0; i < ammount; i++) {
                let newNumber = lastNumber + i + 1
                if (newNumber < 10) newNumber = '0' + newNumber
                let temp = {
                    TanggalSurat,
                    NomorSurat: `ST.${newNumber}/REN/SUBDIT-PWAP/${month}/${year}`,
                    Ditujukan: 'booked',
                    DalamRangka: 'booked',
                    Waktu: 'booked',
                    Tempat: 'booked',
                    File: '',
                    PenyusunKonsep: ''
                }
                answer.push(temp)
            }
            const response = await SPTKeluar.bulkCreate(answer)
            res.status(201).json(response)
        } catch (error) {
            console.log(error, '<<<< error')
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async deleteOne (req, res, next) {
        try {
            const {id} = req.params
            await SPTKeluar.destroy({where: {id}})
            res.status(200).json({message: 'delete success'})
        } catch (error) {
            console.log(error, '<<< error')
            if (error) next(error)
            else next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }

    }
}

module.exports = {
    SPTKeluarController
}