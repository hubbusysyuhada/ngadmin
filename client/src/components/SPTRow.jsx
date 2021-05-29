import { useState, useEffect } from 'react'
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
    DialogTitle,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux'
import { DELETE_SPT, EDIT_SPT } from '../store/actions'
import Swal from 'sweetalert2'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Restaurant ({props}) {
    const dispatch = useDispatch()
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openEditSuccessSnackbar, setOpenEditSuccessSnackbar] = useState(false)
    let [nomor, setNomor] = useState(props.NomorSurat.split('.')[1])
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

    useEffect(() => {
        if (nomor < 10) setNomor(`0${nomor}`)
    }, [])

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
            DalamRangka: props.DalamRangka,
            NomorSurat : props.NomorSurat,
            TanggalSurat : props.TanggalSurat && props.TanggalSurat !== '-' ? new Date(`${props.TanggalSurat} 12:00:00`).toISOString().split('T')[0] : '-',
            Ditujukan: props.Ditujukan,
            Tempat: props.Tempat,
            Waktu: props.Waktu,
            PenyusunKonsep: props.PenyusunKonsep
        })
    }

    function deleteSPT () {
        Swal.fire({
            icon: 'question',
            title: `Delete ${props.NomorSurat}?`,
            text: ` This action is permanent`,
            showDenyButton: true,
            confirmButtonText: `YES`,
            denyButtonText: `NO`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
        }).then(({isConfirmed}) => {
            if (isConfirmed) {
                dispatch(DELETE_SPT(props))
            }
        })
    }

    return (
        <>
            <TableRow key={props.id} >
                <TableCell component="th" scope="row" align="center" onClick={() => setOpen(!open)} >
                    {props.index + 1}
                </TableCell>
                <TableCell align="left" onClick={openCollapsible} >
                    {props.TanggalSurat}
                </TableCell>
                {props.Ditujukan === 'booked' && props.DalamRangka === 'booked' ?
                <TableCell align="right" onClick={openCollapsible}>
                    booked
                </TableCell>
                :
                <TableCell align="left" onClick={openCollapsible}>
                    {props.Ditujukan === 'booked' && props.DalamRangka === 'booked' ? 'booked' : props.NomorSurat}
                </TableCell>
                }
                <TableCell align="left" onClick={openCollapsible}>
                    {props.Ditujukan === 'booked' && props.DalamRangka === 'booked' ? '' : props.DalamRangka}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open.id === props.id && open.status} timeout="auto" unmountOnExit style={{backgroundColor: '#efe8e9'}}>
                    <Box margin={1}>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Ditujukan : </b>
                        {
                                props.Ditujukan && props.Ditujukan !== 'booked'
                            ?
                                <ul>
                                    {
                                        props.Ditujukan.map(person => <li>{person}</li>)
                                    }
                                </ul>
                            :
                                '-'
                        }
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Tempat : </b> {props.Tempat ? props.Tempat : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Waktu : </b> {props.Waktu ? props.Waktu : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <Typography variant="h7" gutterBottom component="div" style={{textAlign: 'left', paddingLeft: '3%'}}>
                        <b> Penyusun Konsep : </b> {props.PenyusunKonsep ? props.PenyusunKonsep : '-'}
                    </Typography>
                    <Divider style={{width: '95%', textAlign: 'center', margin: 'auto', marginTop: '10px', marginBottom: '10px'}}/>
                    <div style={{textAlign: 'right', paddingRight: '2%'}}>
                        <Button variant="contained" color="secondary" onClick={deleteSPT} style={{height: '30px', marginRight: '5px', marginLeft: '5px'}}>DELETE</Button>
                        <Button variant="contained" color="primary" onClick={handleEditClickOpen} style={{height: '30px', marginRight: '5px', marginLeft: '5px'}}>EDIT</Button>
                    </div>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            
            {/* SNACKBARS */}
            <Snackbar open={openEditSuccessSnackbar} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    No. {props.index + 1} EDITED
                </Alert>
            </Snackbar>
            <Snackbar open={openEditErrorSnackbar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    Tanggal dan Tanggal Surat Tidak Boleh Kosong
                </Alert>
            </Snackbar>

            {/* DIALOGS */}
            <Dialog open={openEditDialog} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{margin: 'auto', textAlign: 'center'}}>Edit Surat No. {props.index + 1}</DialogTitle>
                <DialogContent>
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
                        label="DalamRangka"
                        type="text"
                        value={editFormValue ? editFormValue.DalamRangka : ''}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, DalamRangka: e.target.value
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
                        disabled
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Ditujukan"
                        type="text"
                        value={editFormValue ? editFormValue.Ditujukan : ''}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Ditujukan: e.target.value
                            })
                        }}
                        helperText='Pisahkan dengan koma(",")'
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tempat"
                        type="text"
                        value={editFormValue ? editFormValue.Tempat : ''}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Tempat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Waktu"
                        type="text"
                        value={editFormValue ? editFormValue.Waktu : ''}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, Waktu: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Penyusun Konsep"
                        type="text"
                        value={editFormValue ? editFormValue.PenyusunKonsep : ''}
                        onChange={(e) => {
                            setEditFormValue({
                                ...editFormValue, PenyusunKonsep: e.target.value
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
                    const payload = ({
                        ...editFormValue,
                        id: props.id,
                        index: props.index,
                    })

                    handleEditClose()
                    setOpenEditSuccessSnackbar(true)
                    dispatch(EDIT_SPT(payload))
                    let tempTanggalSurat = payload.TanggalSurat ? new Date(`${payload.TanggalSurat} 12:00:00`).toISOString().split('T')[0] : '-'
                    const temp = ({
                        ...payload,
                        TanggalSurat: tempTanggalSurat,
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