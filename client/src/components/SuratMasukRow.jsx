import { useState, useEffect } from 'react'
import img64 from '../assets/disposisi.jpg'
import {jsPDF} from 'jspdf'
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    Collapse,
    Button,
    Snackbar,
    Divider,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { IoDocumentText } from "react-icons/io5";
import { IconContext } from 'react-icons'
import { useDispatch } from 'react-redux'
import { EDIT_SURAT_MASUK } from '../store/actions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Restaurant ({props}) {
    const dispatch = useDispatch()
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openEditSuccessSnackbar, setOpenEditSuccessSnackbar] = useState(false)
    const [open, setOpen] = useState(false);
    const [editFormValue, setEditFormValue] = useState({
        Tanggal: new Date(`${props.Tanggal} 12:00:00`).toISOString().split('T')[0],
        AsalSurat: props.AsalSurat,
        Perihal: props.Perihal,
        NoAgendaDit : props.NoAgendaDit,
        NomorSurat : props.NomorSurat,
        TanggalSurat : props.TanggalSurat && props.TanggalSurat !== '-' ? new Date(`${props.TanggalSurat} 12:00:00`).toISOString().split('T')[0] : '',
        Tujuan: props.Tujuan,
        DisposisiSeksie: props.DisposisiSeksie.join(', '),
        IsiDisposisi: props.IsiDisposisi,
        DisposisiStaff: props.DisposisiStaff.join(', '),
        Catatan: props.Catatan
    })
    const handleEditClickOpen = () => {
        setOpenEditDialog(true);
    };

    useEffect(() => {
        console.log(props, '<<< props buat diisi');
        console.log(open, '<<< status open collapsible');
        setEditFormValue({
            Tanggal: new Date(`${props.Tanggal} 12:00:00`).toISOString().split('T')[0],
            AsalSurat: props.AsalSurat,
            Perihal: props.Perihal,
            NoAgendaDit : props.NoAgendaDit,
            NomorSurat : props.NomorSurat,
            TanggalSurat : props.TanggalSurat && props.TanggalSurat !== '-' ? new Date(`${props.TanggalSurat} 12:00:00`).toISOString().split('T')[0] : '',
            Tujuan: props.Tujuan,
            DisposisiSeksie: props.DisposisiSeksie.join(', '),
            IsiDisposisi: props.IsiDisposisi,
            DisposisiStaff: props.DisposisiStaff.join(', '),
            Catatan: props.Catatan
        })
    }, [])
    
    const handleEditClose = () => {
        setOpenEditDialog(false);
        setEditFormValue({
            Tanggal: new Date(`${props.Tanggal} 12:00:00`).toISOString().split('T')[0],
            AsalSurat: props.AsalSurat,
            Perihal: props.Perihal,
            NoAgendaDit : props.NoAgendaDit,
            NoAgendaSubdit : props.NoAgendaSubdit,
            NomorSurat : props.NomorSurat,
            TanggalSurat : new Date(`${props.TanggalSurat} 12:00:00`).toISOString().split('T')[0],
            Tujuan: props.Tujuan,
            DisposisiSeksie: props.DisposisiSeksie.join(', '),
            IsiDisposisi: props.IsiDisposisi,
            DisposisiStaff: props.DisposisiStaff.join(', '),
            Catatan: props.Catatan
        })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenEditSuccessSnackbar(false);
    };

    function printDispo (event) {
        event.preventDefault()
        // alert(`masuk function untuk print dispo nomor surat ${props.NomorSurat}`)
        var doc = new jsPDF('p', 'mm', [148, 210])
        // const img64 = require('../assets/disposisi64.txt')
        doc.addImage(img64, 'JPEG', 0, 0, 148, 210)
        // doc.save('test.pdf')
        doc.setFontSize(7)
        const fontList = doc.getFontList()
        doc.setFont("Times", 'Italic');
        // doc.setFontType("Italic");
        console.log(fontList, '<<< font list');
        doc.text(105, 24, props.NoAgendaSubdit)
        doc.text(105, 30, props.Tanggal)
        doc.text(20, 53, props.NomorSurat)
        doc.text(80, 53, props.TanggalSurat)
        doc.output('dataurlnewwindow')
    }

    return (
        <>
            <TableRow key={props.id} >
                <TableCell component="th" scope="row" align="center" onClick={() => setOpen(!open)} >
                    {props.NoAgendaSubdit}
                </TableCell>
                <TableCell align="left" onClick={() => setOpen(!open)} >
                    {props.Tanggal}
                </TableCell>
                <TableCell align="left" onClick={() => setOpen(!open)}>
                    {props.AsalSurat}
                </TableCell>
                <TableCell align="left" onClick={() => setOpen(!open)}>
                    {props.Perihal}
                </TableCell>
                <TableCell align="left">
                    <IconContext.Provider value={{size: '20px'}}>
                        <a
                        href="#"
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                        }}
                        onClick={printDispo}
                        ><IoDocumentText/></a>
                    </IconContext.Provider>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit style={{backgroundColor: '#efe8e9'}}>
                    <Box margin={1}>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> No. Agenda Direktur : </b> {props.NoAgendaDit ? props.NoAgendaDit : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> No. Surat : </b> {props.NomorSurat ? props.NomorSurat : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Tanggal Surat : </b> {props.TanggalSurat ? props.TanggalSurat : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Tujuan : </b> {props.Tujuan ? props.Tujuan : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Disposisi Seksie : </b> {props.DisposisiSeksie.length === 0 ? '-' : 
                            <ol>
                                {props.DisposisiSeksie.map(seksie => (<li>{seksie}</li>))}
                            </ol>
                        }
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Isi Disposisi : </b> {props.IsiDisposisi ? props.IsiDisposisi : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Disposisi Staff : </b> {props.DisposisiStaff.length === 0 ? '-' : 
                            <ol>
                                {props.DisposisiStaff.map(staff => (<li>{staff}</li>))}
                            </ol>
                        }
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Catatan : </b> {props.Catatan ? props.Catatan : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <div style={{textAlign: 'right', paddingRight: '2%'}}>
                        <Button variant="contained" color="primary" onClick={handleEditClickOpen}>EDIT</Button>
                    </div>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            
            {/* SNACKBARS */}
            <Snackbar open={openEditSuccessSnackbar} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    {props.NomorSurat} EDITED
                </Alert>
            </Snackbar>

            {/* DIALOGS */}
            <Dialog open={openEditDialog} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{margin: 'auto', textAlign: 'center'}}>Edit No. Agenda Subdit {props.id}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tanggal"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        value={editFormValue.Tanggal}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Tanggal: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nomor Agenda Direktur"
                        type="text"
                        value={editFormValue.NoAgendaDit}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, NoAgendaDit: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Asal Surat"
                        type="text"
                        value={editFormValue.AsalSurat}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, AsalSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Perihal"
                        type="text"
                        value={editFormValue.Perihal}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Perihal: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nomor Surat"
                        type="text"
                        value={editFormValue.NomorSurat}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, NomorSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tanggal Surat"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        value={editFormValue.TanggalSurat}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, TanggalSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tujuan"
                        type="text"
                        value={editFormValue.Tujuan}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Tujuan: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Disposisi Seksie"
                        type="text"
                        value={editFormValue.DisposisiSeksie}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, DisposisiSeksie: e.target.value
                            })
                        }}
                        fullWidth
                        helperText='Pisahkan dengan koma(",")'
                    />
                    <TextField
                        margin="dense"
                        label="Isi Disposisi"
                        type="text"
                        value={editFormValue.IsiDisposisi}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, IsiDisposisi: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Disposisi Staff"
                        type="text"
                        value={editFormValue.DisposisiStaff}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, DisposisiStaff: e.target.value
                            })
                        }}
                        fullWidth
                        helperText='Pisahkan dengan koma(",")'
                    />
                    <TextField
                        margin="dense"
                        label="Catatan"
                        type="text"
                        value={editFormValue.Catatan}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Catatan: e.target.value
                            })
                        }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleEditClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={(event) => {
                    event.preventDefault()
                    handleEditClose()
                    let newDispoSeksie = editFormValue.DisposisiSeksie.split(',')
                    let newDispoStaff = editFormValue.DisposisiStaff.split(',')
                    newDispoSeksie = newDispoSeksie.map(seksie => seksie.trim())
                    newDispoStaff = newDispoStaff.map(staff => staff.trim())
                    const payload = ({
                        ...editFormValue,
                        DisposisiStaff: newDispoStaff,
                        DisposisiSeksie: newDispoSeksie,
                        id: props.id
                    })

                    for (let keys in payload) {
                        console.log(payload[keys] , '<<< payload[keys]');
                        if (!payload[keys]) payload[keys] = '-'
                    }

                    dispatch(EDIT_SURAT_MASUK(payload))
                    
                    let tempTanggal = new Date(`${payload.Tanggal} 12:00:00`).toISOString().split('T')[0]
                    let tempTanggalSurat = new Date(`${payload.TanggalSurat} 12:00:00`).toISOString().split('T')[0]
                    const temp = ({
                        ...payload,
                        Tanggal: tempTanggal,
                        TanggalSurat: tempTanggalSurat,
                        DisposisiSeksie: newDispoSeksie.join(', '),
                        DisposisiStaff: newDispoStaff.join(', ')
                    })
                    setEditFormValue(temp)
                    
                }} color="primary">
                    Edit
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}