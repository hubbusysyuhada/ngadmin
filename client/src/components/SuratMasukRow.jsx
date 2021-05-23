import { useState, useEffect } from 'react'
import img64 from '../assets/disposisi.jpg'
import {jsPDF} from 'jspdf'
import {
    Typography,
    TableCell,
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
    DialogTitle
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { IoDocumentText } from "react-icons/io5";
import { IconContext } from 'react-icons'
import { useDispatch } from 'react-redux'
import { EDIT_SURAT_MASUK } from '../store/actions'
import Swal from 'sweetalert2'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Restaurant ({props}) {
    const dispatch = useDispatch()
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openEditSuccessSnackbar, setOpenEditSuccessSnackbar] = useState(false)
    const [openEditErrorSnackbar, setOpenEditErrorSnackbar] = useState(false)
    const [open, setOpen] = useState({
        id: null,
        status: false
    });
    const [editFormValue, setEditFormValue] = useState(null)
    
    const handleEditClickOpen = () => {
        setOpenEditDialog(true);
    };
    
    const handleEditClose = () => {
        setOpenEditDialog(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenEditSuccessSnackbar(false);
        setOpenEditErrorSnackbar(false)
    };

    function printDispo (event) {
        event.preventDefault()
        var doc = new jsPDF('p', 'mm', [148, 210])
        doc.addImage(img64, 'JPEG', 0, 0, 148, 210)
        doc.setFontSize(8)
        doc.setFont("Times", 'Italic');
        const splittedTextPerihal = doc.splitTextToSize(props.Perihal, 109)
        doc.text(105, 24, props.NoAgendaSubdit)
        doc.text(105, 30, props.Tanggal)
        doc.text(20, 53, props.NomorSurat)
        doc.text(80, 53, props.TanggalSurat)
        doc.text(35, 76, props.AsalSurat)
        doc.text(19, 61, splittedTextPerihal)
        Swal.fire({
            icon: 'question',
            text: `DOWNLOAD DISPOSISI NO. ${props.NoAgendaSubdit} ?`,
            showDenyButton: true,
            confirmButtonText: `YES, DOWNLOAD`,
            denyButtonText: `NO, OPEN IN NEW TAB`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
        }).then(({isConfirmed, isDenied}) => {
            if (isConfirmed) doc.save(`Disposisi Surat Masuk Agenda Subdit ${props.NoAgendaSubdit}.pdf`)
            else if (isDenied) doc.output('dataurlnewwindow',{filename: `Disposisi Surat Masuk Agenda Subdit ${props.NoAgendaSubdit}.pdf`})        // doc.save('test.pdf')
        })
    }

    function openCollapsible() {
        if (open.id !== props.id) {
            setOpen({
                id: props.id,
                status: true
            })
        } else {
            setOpen({
                id: props.id,
                status: !open.status
            })
        }
        setEditFormValue({
            Tanggal: new Date(`${props.Tanggal} 12:00:00`).toISOString().split('T')[0],
            AsalSurat: props.AsalSurat,
            Perihal: props.Perihal,
            NoAgendaDit : props.NoAgendaDit,
            NomorSurat : props.NomorSurat,
            TanggalSurat : props.TanggalSurat && props.TanggalSurat !== '-' ? new Date(`${props.TanggalSurat} 12:00:00`).toISOString().split('T')[0] : '-',
            Tujuan: props.Tujuan,
            DisposisiSeksie: props.DisposisiSeksie.join(', '),
            IsiDisposisi: props.IsiDisposisi,
            DisposisiStaff: props.DisposisiStaff.join(', '),
            Catatan: props.Catatan
        })
    }

    return (
        <>
            <TableRow key={props.id} >
                <TableCell component="th" scope="row" align="center" onClick={() => setOpen(!open)} >
                    {props.NoAgendaSubdit}
                </TableCell>
                <TableCell align="left" onClick={openCollapsible} >
                    {props.Tanggal}
                </TableCell>
                <TableCell align="left" onClick={openCollapsible}>
                    {props.AsalSurat}
                </TableCell>
                <TableCell align="left" onClick={openCollapsible}>
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
                <Collapse in={open.id === props.id && open.status} timeout="auto" unmountOnExit style={{backgroundColor: '#efe8e9'}}>
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
                        <Button variant="contained" color="primary" onClick={handleEditClickOpen} style={{height: '30px'}}>EDIT</Button>
                    </div>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            
            {/* SNACKBARS */}
            <Snackbar open={openEditSuccessSnackbar} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    No. {props.NoAgendaSubdit} EDITED
                </Alert>
            </Snackbar>
            <Snackbar open={openEditErrorSnackbar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    Tanggal dan Tanggal Surat Tidak Boleh Kosong
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
                        value={editFormValue ? editFormValue.Tanggal : ''}
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
                        value={editFormValue ? editFormValue.NoAgendaDit : ''}
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
                        value={editFormValue ? editFormValue.AsalSurat : ''}
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
                        value={editFormValue ? editFormValue.Perihal : ''}
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
                        value={editFormValue ? editFormValue.NomorSurat : ''}
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
                        value={editFormValue ? editFormValue.TanggalSurat : ''}
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
                        value={editFormValue ? editFormValue.Tujuan : ''}
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
                        value={editFormValue ? editFormValue.DisposisiSeksie : ''}
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
                        value={editFormValue ? editFormValue.IsiDisposisi : ''}
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
                        value={editFormValue ? editFormValue.DisposisiStaff : ''}
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
                        value={editFormValue ? editFormValue.Catatan : ''}
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
                    let newDispoSeksie = editFormValue.DisposisiSeksie.split(',')
                    let newDispoStaff = editFormValue.DisposisiStaff.split(',')
                    newDispoSeksie = newDispoSeksie.map(seksie => seksie.trim())
                    newDispoStaff = newDispoStaff.map(staff => staff.trim())
                    if (JSON.stringify(newDispoSeksie) === '[""]') newDispoSeksie = []
                    if (JSON.stringify(newDispoStaff) === '[""]') newDispoStaff = []
                    const payload = ({
                        ...editFormValue,
                        DisposisiStaff: newDispoStaff,
                        DisposisiSeksie: newDispoSeksie,
                        id: props.id,
                        NoAgendaSubdit: props.NoAgendaSubdit
                    })
                    let flag = true
                    if (payload.Tanggal === '-' || payload.TanggalSurat === '-') flag = false
                    for (let keys in payload) {
                        if (!payload[keys]) payload[keys] = '-'
                    }
                    if (!flag) {
                        setOpenEditErrorSnackbar(true)
                    }
                    else {
                        handleEditClose()
                        setOpenEditSuccessSnackbar(true)
                        dispatch(EDIT_SURAT_MASUK(payload))
                        let tempTanggal = payload.Tanggal ? new Date(`${payload.Tanggal} 12:00:00`).toISOString().split('T')[0] : '-'
                        let tempTanggalSurat = payload.TanggalSurat ? new Date(`${payload.TanggalSurat} 12:00:00`).toISOString().split('T')[0] : '-'
                        const temp = ({
                            ...payload,
                            Tanggal: tempTanggal,
                            TanggalSurat: tempTanggalSurat,
                            DisposisiSeksie: newDispoSeksie.join(', '),
                            DisposisiStaff: newDispoStaff.join(', '),
                        })
                        setEditFormValue(temp)
                    }
                    
                }} color="primary">
                    Edit
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}