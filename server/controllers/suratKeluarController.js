const {SuratKeluar} = require('../models')
const {changeDateFormat} = require('../helpers/changeDateFormat')
const { uploadFileToGoogleDrive, deleteFile, generatePublicUrl } = require('../helpers/googleapis')
const dateLog = require('../helpers/dateLog')

class SuratKeluarController {
    static async fetchAll (req, res, next) {
        try {
            const {year} = req.headers
            const response = await SuratKeluar.findAll({order: [['id', 'ASC']]})
            let temp = response.filter(spt => spt.TanggalSurat.includes(year))
            temp.forEach(spt => {
                spt.sortingDate = new Date(spt.TanggalSurat)
                if (spt.Ditujukan) spt.Ditujukan = JSON.parse(spt.Ditujukan)
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
            let response = await SuratKeluar.findByPk(+id)
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
            const {type} = req.body
            let answer = {
                TanggalSurat: req.body.TanggalSurat,
                NomorSurat: req.body.NomorSurat,
                Tujuan: req.body.Tujuan,
                Perihal: req.body.Perihal,
                Waktu: req.body.Waktu,
                Tempat: req.body.Tempat,
                File: req.body.File,
                PenyusunKonsep: req.body.PenyusunKonsep,
                logs: req.body.logs
            }
            answer.logs.push(`${dateLog()} - EDITED by ${req.loggedUser.name}`)
            let temp = answer.NomorSurat.split('/')
            temp[0] = temp[0].split('.')
            const editedDate = answer.TanggalSurat.split('-')
            answer.NomorSurat = `${type}.${temp[0][1]}/REN/SUBDIT-PWAP/${editedDate[1]}/${editedDate[0]}`
            answer.TanggalSurat = changeDateFormat(answer.TanggalSurat).serverDate
            const response = await SuratKeluar.update(answer, {where: {id}, returning: true})
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

    static async createNew (req, res, next) {
        try {
            let last = await SuratKeluar.findAll({order: [['id', 'DESC']]})
            last = last.filter(surat => surat.TanggalSurat.includes(req.headers.year))
            let lastNumber;
            last.length == 0 ? lastNumber = 0 : lastNumber = last[0].NomorSurat
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
                Tujuan: req.body.Tujuan,
                Perihal: req.body.Perihal,
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
            const {type} = req.body
            answer.NomorSurat = `${type}.${newNumber}/REN/SUBDIT-PWAP/${formattedDate.month}/${formattedDate.year}`
            answer.TanggalSurat = formattedDate.serverDate
            answer.logs = [ `${dateLog()} - CREATED by ${req.loggedUser.name}` ]
            const response = await SuratKeluar.create(answer)
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
    
    static async bookMany (req, res, next) {
        try {
            let {ammount, TanggalSurat, type} = req.body
            let tahun = req.headers.year
            const formattedDate = changeDateFormat(TanggalSurat)
            let last = await SuratKeluar.findAll({order: [['id', 'DESC']]})
            last = last.filter(surat => surat.TanggalSurat.includes(req.headers.year))
            let lastNumber;
            last.length == 0 ? lastNumber = 0 : lastNumber = last[0].NomorSurat
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
                    TanggalSurat: formattedDate.serverDate,
                    NomorSurat: `${type}.${newNumber}/REN/SUBDIT-PWAP/${formattedDate.month}/${formattedDate.year}`,
                    Tujuan: 'booked',
                    Perihal: 'booked',
                    Waktu: '',
                    Tempat: '',
                    File: '',
                    PenyusunKonsep: '',
                    logs: [
                        `${dateLog()} - BOOKED by ${req.loggedUser.name}`
                    ]
                }
                answer.push(temp)
            }
            const response = await SuratKeluar.bulkCreate(answer)
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
            await SuratKeluar.destroy({where: {id}})
            res.status(200).json({message: 'delete success'})
        } catch (error) {
            console.log(error);
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }

    static async uploadFile (req, res, next) {
        const { id } = req.params
        const currentFile = await SuratKeluar.findByPk(id)
        if (currentFile.File) {
            let temp = JSON.parse(currentFile.File)
            await deleteFile(temp.id)
        }
        const response = await uploadFileToGoogleDrive(`${new Date().toLocaleDateString().split('/').join('')}-${req.files[0].originalname}`, req.files[0])
        const link = await generatePublicUrl(response.id)
        const answer = {
            id: response.id,
            download: link.data.webContentLink,
            lastUpload: req.headers.name
        }
        const logs = currentFile.File ?
        [...currentFile.logs, `${dateLog()} - FILE CHANGED by ${req.loggedUser.name}`]
        : [...currentFile.logs, `${dateLog()} - FILE UPLOADED by ${req.loggedUser.name}`]
        await SuratKeluar.update({File: JSON.stringify(answer), logs}, {where: {id}})

        res.status(200).json(answer)
    }
}

module.exports = {
    SuratKeluarController
}