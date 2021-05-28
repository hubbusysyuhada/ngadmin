import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import loading_gif from '../assets/loading.gif'
import { FETCH_SURAT_KELUAR, ADD_SURAT_KELUAR, BOOK_SURAT_KELUAR, FETCH_SPT, ADD_SPT, BOOK_SPT } from '../store/actions';
import SPTRow from '../components/SPTRow'

const useStyle = makeStyles({
    text : {
        fontFamily: 'monospace'
    },
    container : {
        height: '100vh'
    },
    item: {
        textAlign: 'center',
    },
    tableRoot: {
        width: '90%',
        textAlign: 'center',
        margin: 'auto'
    },
        tableContainer: {
        maxHeight: 500,
        }
})

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SPT () {
    const dispatch = useDispatch()
    const state_spt = useSelector(state => state.SPTKeluarReducer.datas)
    const [filteredArray, setFilteredArray] = useState(null)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openBookDialog, setOpenBookDialog] = useState(false)
    const style = useStyle()
    const history = useHistory()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('')
    const [openAddSuccessSnackbar, setOpenAddSuccessSnackbar] = useState(false)
    const [openBookSuccessSnackbar, setOpenBookSuccessSnackbar] = useState(false)
    const [openAddErrorSnackbar, setOpenAddErrorSnackbar] = useState(false)
    let today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }).split(',')[0].split('/')
    if (today[0] < 10) today[0] = `0${today[0]}`
    if (today[1] < 10) today[1] = `0${today[1]}`
    today = `${today[2]}-${today[0]}-${today[1]}`
    const [newForm, setNewForm] = useState({
        TanggalSurat: today,
        Ditujukan: null,
        DalamRangka: null,
        Waktu: null,
        Tempat: null,
        PenyusunKonsep: null,
    })
    const [bookForm, setBookForm] = useState({
        TanggalSurat: today,
        ammount: 1
    })
    
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push('/auth')
        } else {
            dispatch(FETCH_SPT())
        }
    }, [])

    useEffect(() => {
        if (filter) {
            let filtered = state_spt.filter(surat => (
                surat.DalamRangka?.toLowerCase().includes(filter)
                ||
                surat.NomorSurat?.toLowerCase().includes(filter)
                ||
                surat.TanggalSurat?.toLowerCase().includes(filter)
                ||
                surat.Waktu?.toLowerCase().includes(filter)
                ||
                surat.Tempat?.toLowerCase().includes(filter)
                ||
                (surat.Ditujukan && surat.Ditujukan !== 'booked' ? surat.Ditujukan.join().toLowerCase().includes(filter) : '')
            ))
            setPage(0)
            setFilteredArray(filtered)
        } else {
            setFilteredArray(null)
        }
    }, [filter])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAddSuccessSnackbar(false);
        setOpenAddErrorSnackbar(false);
        setOpenBookSuccessSnackbar(false);
    };

    const handleAddClose = () => {
        setNewForm({
            TanggalSurat: today,
            Ditujukan: null,
            DalamRangka: null,
            Waktu: null,
            Tempat: null,
            PenyusunKonsep: null,
        })
        setOpenAddDialog(false);
    };

    const handleBookClose = () => {
        setOpenBookDialog(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Grid container spacing={3} className={style.container}>
                <Grid item xs={2}>
                    <div>
                        <Navbar/>
                    </div>
                </Grid>
                <Grid item xs={10} className={style.item}>
                    <div style={{marginTop: '10px'}}>
                        <Typography variant="h3" className={style.text}>
                            SPT
                        </Typography>
                        <Typography variant="h5" className={style.text}>
                            {localStorage.getItem('year')}
                        </Typography>
                        <br/>
                            {state_spt ?
                                <>
                                    <div style={{textAlign: 'left', width: '95%', marginLeft: '4%', marginBottom: '10px', marginTop: '0', display: 'flex', justifyContent: 'space-between'}}>
                                        <TextField label="Cari Surat Keluar" size="small" style={{width: '350px', margin: '20px', textAlign: 'left'}} onChange={(e) => setFilter(e.target.value)} helperText="Dalam Rangka, Nomor Surat, Tanggal, Tempat, Tujuan"/>
                                        <Button size='small' variant='contained' color='primary' style={{width: '100px', margin: '20px', marginRight: '4%', height: '30px', marginTop: '60px'}} onClick={() => setOpenAddDialog(true)}>NEW</Button>
                                    </div>
                                    <Paper className={style.tableRoot}>
                                        <TableContainer className={style.tableContainer}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '5%', textAlign: 'center' }}
                                                    >
                                                        No.
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '15%', textAlign: 'center' }}
                                                    >
                                                        Tanggal
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '40%', textAlign: 'center' }}
                                                    >
                                                        Nomor Surat
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '40%', textAlign: 'center' }}
                                                    >Dalam Rangka
                                                    </TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    { filteredArray ? 
                                                    
                                                    // jika filtered array ada isinya
                                                    (rowsPerPage > 0 ? filteredArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    :
                                                    filteredArray).map((SuratKeluar) => {
                                                        return (
                                                            <SPTRow props={SuratKeluar} />
                                                        )
                                                    })

                                                    :
                                                    state_spt ? (rowsPerPage > 0 ? state_spt.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    :
                                                    state_spt).map((SuratKeluar) => {
                                                        return (
                                                            <SPTRow props={SuratKeluar} />
                                                        )
                                                    }): ''}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                        rowsPerPageOptions={[10, 25, 50]}
                                        component="div"
                                        count={filteredArray ? filteredArray.length : state_spt ? state_spt.length : 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </>
                            :
                                <>
                                    <img src={loading_gif} alt="image cannot be shown"/>
                                    <Typography variant="h4" className={style.text}>
                                        loading...
                                    </Typography>
                                </>
                            }
                    </div>
                </Grid>
            </Grid>

            {/* SNACKBARS */}
            <Snackbar open={openAddSuccessSnackbar} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    SPT Berhasil Ditambahkan
                </Alert>
            </Snackbar>
            <Snackbar open={openBookSuccessSnackbar} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Berhasil Book SPT Sebanyak {bookForm.ammount}
                </Alert>
            </Snackbar>
            <Snackbar open={openAddErrorSnackbar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    Tanggal dan Tanggal Surat Tidak Boleh Kosong
                </Alert>
            </Snackbar>

            {/* DIALOGS */}
            <Dialog open={openAddDialog} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{margin: 'auto', textAlign: 'center'}}>Buat SPT Baru</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tanggal"
                        type="date"
                        defaultValue={today}
                        InputLabelProps={{shrink: true}}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, TanggalSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Ditujukan"
                        helperText='Pisahkan dengan koma(",")'
                        type="text"
                        value={newForm.Ditujukan}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, Ditujukan: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Dalam Rangka"
                        type="text"
                        value={newForm.DalamRangka}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, DalamRangka: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Waktu"
                        type="text"
                        value={newForm.Waktu}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, Waktu: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tempat"
                        type="text"
                        value={newForm.Tempat}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, Tempat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Penyusun Konsep"
                        type="text"
                        value={newForm.PenyusunKonsep}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, PenyusunKonsep: e.target.value
                            })
                        }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button
                    onClick={() => {
                        handleAddClose()
                        setOpenBookDialog(true)
                    }}
                    color="primary"
                >
                    Book SPT
                </Button>
                <Button onClick={handleAddClose} color="primary">
                    Cancel
                </Button>
                <Button
                onClick={(event) => {
                    event.preventDefault()
                    const payload = JSON.parse(JSON.stringify(newForm))
                    handleAddClose()
                    dispatch(ADD_SPT(payload))
                    setOpenAddSuccessSnackbar(true)

                }}
                color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openBookDialog} onClose={handleBookClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{margin: 'auto', textAlign: 'center'}}>Book SPT</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tanggal Surat"
                        type="date"
                        defaultValue={today}
                        InputLabelProps={{shrink: true}}
                        onChange={(e) => {
                            setBookForm({
                                ...bookForm, TanggalSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Jumlah"
                        type="number"
                        defaultValue="1"
                        InputProps={{
                            inputProps: { 
                                min: 1
                            }
                        }}
                        InputLabelProps={{shrink: true}}
                        onChange={(e) => {
                            setBookForm({
                                ...bookForm, ammount: e.target.value
                            })
                        }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                <Button
                    onClick={() => {
                        handleBookClose()
                        setOpenAddDialog(true)
                    }}
                    color="primary"
                >
                    Buat baru
                </Button>
                <Button onClick={handleAddClose} color="primary">
                    Cancel
                </Button>
                <Button
                onClick={(event) => {
                    event.preventDefault()
                    const payload = JSON.parse(JSON.stringify(bookForm))
                    // dispatch(BOOK_SURAT_KELUAR(payload))
                    dispatch(BOOK_SPT(payload))
                    handleBookClose()
                    setOpenBookSuccessSnackbar(true)
                }}
                color="primary">
                    Submit
                </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
    
}