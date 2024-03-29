const { changeDateFormat } = require('../helpers/changeDateFormat');
const {SuratMasuk} = require('../models')
const { uploadFileToGoogleDrive, deleteFile, generatePublicUrl } = require('../helpers/googleapis')
const dateLog = require('../helpers/dateLog')

class SuratMasukController {
    static fetchAll (req, res, next) {
        const {year} = req.headers
        SuratMasuk.findAll({order: [['id', 'DESC']]})
            .then (data => {
                data.forEach(surat => {
                    surat.DisposisiSeksie = JSON.parse(surat.DisposisiSeksie)
                    surat.DisposisiStaff = JSON.parse(surat.DisposisiStaff)
                    if (surat.File) surat.File = JSON.parse(surat.File)
                });

                data = data.filter(surat => surat.Tanggal.includes(String(year)))
                res.status(200).json(data)
            })
            .catch (err => {
                next({
                    name: 'custom error',
                    code: 500,
                    message: 'internal server error'
                })
            })
    }

    static fetchOne (req, res, next) {
        const {id} = req.params
        SuratMasuk.findByPk(id)
            .then (data => {
                data.DisposisiSeksie = JSON.parse(data.DisposisiSeksie)
                data.DisposisiStaff = JSON.parse(data.DisposisiStaff)
                res.status(200).json(data)
            })
            .catch (err => {
                console.log(err);
                next({
                    name: 'custom error',
                    code: 404,
                    message: 'not found'
                })
            })
    }

    static async newSuratMasuk (req, res, next) {
        try {
            const {year} = req.headers
            const arrOfData = await SuratMasuk.findAll({order: [['id', 'DESC']]})
            const last = arrOfData.filter(surat => surat.Tanggal.includes(String(year)))[0]
            const answer = {
                Tanggal: changeDateFormat(req.body.Tanggal).serverDate,
                NoAgendaSubdit: last ? +last.NoAgendaSubdit + 1 : 1,
                NoAgendaDit: req.body.NoAgendaDit ? req.body.NoAgendaDit : '-',
                AsalSurat: req.body.AsalSurat ? req.body.AsalSurat : '-',
                NomorSurat: req.body.NomorSurat ? req.body.NomorSurat : '-',
                Tujuan: req.body.Tujuan ? req.body.Tujuan : '-',
                TanggalSurat: (req.body.TanggalSurat ? changeDateFormat(req.body.TanggalSurat).serverDate : '-'),
                Perihal: req.body.Perihal ? req.body.Perihal : '-',
                DisposisiSeksie: "[]",
                DisposisiStaff: "[]",
                logs: [
                    `${dateLog()} - CREATED by ${req.loggedUser.name}`
                ]
            }
            SuratMasuk.create(answer)
                .then(data => {
                    res.status(201).json({message: 'success!', data})
                })
            
        } catch (error) {
            console.log(error, '<<<< error');
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }

    static async editOne (req, res, next) {
        try {
            const {id} = req.params
            const answer = {
                Tanggal: changeDateFormat(req.body.Tanggal).serverDate,
                NoAgendaDit: req.body.NoAgendaDit,
                AsalSurat: req.body.AsalSurat,
                NomorSurat: req.body.NomorSurat,
                Tujuan: req.body.Tujuan,
                TanggalSurat: changeDateFormat(req.body.TanggalSurat).serverDate,
                Perihal: req.body.Perihal,
                Catatan: req.body.Catatan,
                IsiDisposisi: req.body.IsiDisposisi,
                DisposisiSeksie: req.body.DisposisiSeksie,
                DisposisiStaff: req.body.DisposisiStaff,
                logs: req.body.logs
            }
            answer.logs.push(`${dateLog()} - EDITED by ${req.loggedUser.name}`)
            answer.DisposisiSeksie = JSON.stringify(answer.DisposisiSeksie)
            answer.DisposisiStaff = JSON.stringify(answer.DisposisiStaff)
            const data = await SuratMasuk.update(answer, {where: {id}, returning:true})
            res.status(200).json(data)
            
        } catch (error) {
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }

    static async deleteOne (req, res, next) {
        try {
            const {id} = req.params
            await SuratMasuk.destroy({where: {id}})
            deleteFile(id)
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
        const currentFile = await SuratMasuk.findByPk(id)
        if (currentFile.File) {
            let temp = JSON.parse(currentFile.File)
            await deleteFile(temp.id)
        }
        const response = await uploadFileToGoogleDrive(`${new Date().toLocaleDateString().split('/').join('')}-${req.files[0].originalname}`, req.files[0])
        const link = await generatePublicUrl(response.id)
        const answer = {
            id: response.id,
            download: link.data.webViewLink,
            lastUpload: req.headers.name
        }
        const logs = currentFile.File ?
            [...currentFile.logs, `${dateLog()} - FILE CHANGED by ${req.loggedUser.name}`]
            : [...currentFile.logs, `${dateLog()} - FILE UPLOADED by ${req.loggedUser.name}`]
        await SuratMasuk.update({File: JSON.stringify(answer), logs}, {where: {id}})

        res.status(200).json(answer)
    }

}

module.exports = SuratMasukController