const { changeDateFormat } = require('../helpers/changeDateFormat');
const {UndanganMasuk} = require('../models')
const { uploadFileToGoogleDrive, deleteFile, generatePublicUrl } = require('../helpers/googleapis')

class UndanganMasukController {
    static fetchAll (req, res, next) {
        const {year} = req.headers
        UndanganMasuk.findAll({order: [['id', 'DESC']]})
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
        UndanganMasuk.findByPk(id)
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

    static async newUndanganMasuk (req, res, next) {
        try {
            const {year} = req.headers
            const arrOfData = await UndanganMasuk.findAll({order: [['id', 'DESC']]})
            const last = arrOfData.filter(surat => surat.Tanggal.includes(String(year)))[0]
            const answer = {
                Tanggal: changeDateFormat(req.body.Tanggal).serverDate,
                NoAgendaSubdit: last ? +last.NoAgendaSubdit + 1 : 1,
                NoAgendaDit: req.body.NoAgendaDit,
                AsalSurat: req.body.AsalSurat,
                NomorSurat: req.body.NomorSurat,
                Tujuan: req.body.Tujuan,
                TanggalSurat: changeDateFormat(req.body.TanggalSurat).serverDate,
                Perihal: req.body.Perihal,
                Tempat: req.body.Tempat,
                Waktu: req.body.Waktu,
                DisposisiSeksie: "[]",
                DisposisiStaff: "[]"
            }
            UndanganMasuk.create(answer)
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
                Tempat: req.body.Tempat,
                Waktu: req.body.Waktu,
                IsiDisposisi: req.body.IsiDisposisi,
                DisposisiSeksie: req.body.DisposisiSeksie,
                DisposisiStaff: req.body.DisposisiStaff
            }
            
            const data = await UndanganMasuk.update(answer, {where: {id}, returning:true})
            res.status(200).json(data)
            
        } catch (error) {
            console.log(error, '<<<< error');
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
            await UndanganMasuk.destroy({where: {id}})
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
        const currentFile = await UndanganMasuk.findByPk(id)
        if (currentFile.File) {
            let temp = JSON.parse(currentFile.File)
            await deleteFile(temp.id)
        }

        const response = await uploadFileToGoogleDrive(`${new Date().toLocaleDateString().split('/').join('')}-${req.files[0].originalname}`, req.files[0])
        const link = await generatePublicUrl(response.id)
        const answer = {
            id: response.id,
            download: link.data.webViewLink,
            // download: link.data.webContentLink,
            lastUpload: req.headers.name
        }
        await UndanganMasuk.update({File: JSON.stringify(answer)}, {where: {id}})

        res.status(200).json(answer)
    }
}

module.exports = UndanganMasukController