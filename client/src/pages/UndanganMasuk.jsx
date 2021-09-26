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
    Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import loading_gif from '../assets/loading.gif'
import { FETCH_UNDANGAN_MASUK, ADD_UNDANGAN_MASUK } from '../store/actions';
import UndanganMasukRow from '../components/UndanganMasukRow'

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

export default function UndanganMasuk () {
    const dispatch = useDispatch()
    const undanganMasukData = useSelector(state => state.UndanganMasukReducer.datas)
    const [filteredArray, setFilteredArray] = useState(null)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const style = useStyle()
    const history = useHistory()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('')
    const [openAddSuccessSnackbar, setOpenAddSuccessSnackbar] = useState(false)
    const [openAddErrorSnackbar, setopenAddErrorSnackbar] = useState(false)
    let today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }).split(',')[0].split('/')
    if (today[0] < 10) today[0] = `0${today[0]}`
    if (today[1] < 10) today[1] = `0${today[1]}`
    today = `${today[2]}-${today[0]}-${today[1]}`
    const [newForm, setNewForm] = useState({
        Tanggal: today,
        NoAgendaDit: null,
        AsalSurat: null,
        Perihal: null,
        NomorSurat: null,
        TanggalSurat: null,
        Tujuan: null,
        Tempat: null,
        Waktu: null
    })
    
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push('/auth')
        } else {
            dispatch(FETCH_UNDANGAN_MASUK())
        }
    }, [])

    useEffect(() => {
        if (filter) {
            let filtered = undanganMasukData.filter(surat => (
                surat.AsalSurat.toLowerCase().includes(filter)
                ||
                surat.Perihal.toLowerCase().includes(filter)
                ||
                surat.NomorSurat.toLowerCase().includes(filter)
                ||
                surat.Tanggal.toLowerCase().includes(filter)
                ||
                surat.Tujuan.toLowerCase().includes(filter)
                ||
                surat.Waktu.toLowerCase().includes(filter)
                ||
                surat.Tempat.toLowerCase().includes(filter)
                ||
                surat.DisposisiSeksie.join('').toLowerCase().includes(filter)
                ||
                surat.DisposisiStaff.join('').toLowerCase().includes(filter)
                ||
                String(surat.NoAgendaSubdit).includes(filter)
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
        setopenAddErrorSnackbar(false)
    };

    const handleAddClose = () => {
        setNewForm({
            Tanggal: today,
            NoAgendaDit: null,
            AsalSurat: null,
            Perihal: null,
            NomorSurat: null,
            TanggalSurat: null,
            Tujuan: null
        })
        setOpenAddDialog(false);
    };

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
                            UNDANGAN MASUK
                        </Typography>
                        <Typography variant="h5" className={style.text}>
                            {localStorage.getItem('year')}
                        </Typography>
                        <br/>
                            {undanganMasukData ?
                                <>
                                    <div style={{textAlign: 'left', width: '95%', marginLeft: '4%', marginBottom: '10px', marginTop: '0', display: 'flex', justifyContent: 'space-between'}}>
                                        <TextField label="Cari Undangan" size="small" style={{width: '500px', margin: '20px', textAlign: 'left'}} onChange={(e) => setFilter(e.target.value)} helperText="Asal Surat, Nama Staff/Seksie, Nomor Surat, Perihal, Tanggal, Tempat, Tujuan, Waktu"/>
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
                                                        style={{ width: '20%', textAlign: 'center' }}
                                                    >
                                                        Asal Surat
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '15%', textAlign: 'center' }}
                                                    >
                                                        Tujuan
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '35%', textAlign: 'center' }}
                                                    >Perihal
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '10%', textAlign: 'center' }}
                                                    />
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    { filteredArray ? 
                                                    
                                                    // jika filtered array ada isinya
                                                    (rowsPerPage > 0 ? filteredArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    :
                                                    filteredArray).map(SuratMasuk => {
                                                        return (
                                                            <UndanganMasukRow props={SuratMasuk} />
                                                        )
                                                    })

                                                    :
                                                    undanganMasukData ? (rowsPerPage > 0 ? undanganMasukData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    :
                                                    undanganMasukData).map(SuratMasuk => {
                                                        return (
                                                            <UndanganMasukRow props={SuratMasuk} />
                                                        )
                                                    }): ''}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                        rowsPerPageOptions={[10, 25, 50]}
                                        component="div"
                                        count={filteredArray ? filteredArray.length : undanganMasukData ? undanganMasukData.length : 0}
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
                    Undangan Berhasil Ditambahkan
                </Alert>
            </Snackbar>
            <Snackbar open={openAddErrorSnackbar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    Tanggal dan Tanggal Surat Tidak Boleh Kosong
                </Alert>
            </Snackbar>

            {/* DIALOGS */}
            <Dialog open={openAddDialog} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{margin: 'auto', textAlign: 'center'}}>Buat Undangan Baru</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tanggal"
                        type="date"
                        defaultValue={today}
                        InputLabelProps={{shrink: true}}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, Tanggal: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nomor Agenda Direktur"
                        type="text"
                        value={newForm.NoAgendaDit}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, NoAgendaDit: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Asal Surat"
                        type="text"
                        value={newForm.AsalSurat}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, AsalSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Perihal"
                        type="text"
                        value={newForm.Perihal}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, Perihal: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nomor Surat"
                        type="text"
                        value={newForm.NomorSurat}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, NomorSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tanggal Surat"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        value={newForm.TanggalSurat}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, TanggalSurat: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tujuan"
                        type="text"
                        value={newForm.Tujuan}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, Tujuan: e.target.value
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
                </DialogContent>
                <DialogActions>
                <Button onClick={handleAddClose} color="primary">
                    Cancel
                </Button>
                <Button
                onClick={(event) => {
                    event.preventDefault()
                    const payload = JSON.parse(JSON.stringify(newForm))
                    for (let keys in payload) {
                        if (!payload[keys]) payload[keys] = '-'
                    }
                    let flag = true
                    if (payload.Tanggal === '-' || payload.TanggalSurat === '-') flag = false
                    if (!flag) setopenAddErrorSnackbar(true)
                    else {
                        setopenAddErrorSnackbar(false)
                        handleAddClose()

                        dispatch(ADD_UNDANGAN_MASUK(payload))

                        setOpenAddSuccessSnackbar(true)
                    }

                }}
                color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog>




        </div>
    )
    
}