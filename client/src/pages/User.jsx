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
import { FETCH_UNDANGAN_MASUK, ADD_UNDANGAN_MASUK, FETCH_USERS, REGISTER_ACCOUNT } from '../store/actions';
import UserRow from '../components/UserRow'

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
        width: '70%',
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

export default function User () {
    const dispatch = useDispatch()
    const usersRedux = useSelector(state => state.AuthReducer.userList)
    const [filteredArray, setFilteredArray] = useState(null)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const style = useStyle()
    const history = useHistory()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('')
    const [openAddSuccessSnackbar, setOpenAddSuccessSnackbar] = useState(false)
    const [openAddErrorSnackbar, setopenAddErrorSnackbar] = useState(false)
    const [openPasswordErrorSnackbar, setopenPasswordErrorSnackbar] = useState(false)
    let today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }).split(',')[0].split('/')
    if (today[0] < 10) today[0] = `0${today[0]}`
    if (today[1] < 10) today[1] = `0${today[1]}`
    today = `${today[2]}-${today[0]}-${today[1]}`
    const [newForm, setNewForm] = useState({
        username: null,
        name: null,
        password: null,
        confirmPassword: null
    })
    
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push('/auth')
        } else {
            dispatch(FETCH_USERS())
        }
    }, [])
    
    useEffect(() => {
        if (filter) {
            let filtered = usersRedux.filter(surat => (
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
        setopenPasswordErrorSnackbar(false)
    };

    const handleAddClose = () => {
        setNewForm({
            username: null,
            name: null,
            password: null,
            confirmPassword: null
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
                            DAFTAR ACCOUNT
                        </Typography>
                        <br/>
                                <div style={{textAlign: 'right', width: '95%', marginLeft: '4%', marginBottom: '10px', marginTop: '0'}}>
                                    <Button size='small' variant='contained' color='primary' style={{width: '100px', margin: '20px', marginRight: '4%', height: '30px', marginTop: '60px'}} onClick={() => setOpenAddDialog(true)}>register</Button>
                                </div>
                            {usersRedux.length !== 0 ?
                                <>
                                    <Paper className={style.tableRoot}>
                                        <TableContainer className={style.tableContainer}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '20%', textAlign: 'center' }}
                                                    >
                                                        No.
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '80%', textAlign: 'center' }}
                                                    >
                                                        Name
                                                    </TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        (rowsPerPage > 0 ? usersRedux.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        :
                                                        usersRedux).map((SuratMasuk, index) => {
                                                            SuratMasuk.index = index
                                                            return (
                                                                <UserRow props={SuratMasuk} />
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                        rowsPerPageOptions={[10, 25, 50]}
                                        component="div"
                                        count={usersRedux.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </>
                            :
                                ''
                            }
                    </div>
                </Grid>
            </Grid>

            {/* SNACKBARS */}
            <Snackbar open={openAddSuccessSnackbar} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Alert onClose={handleClose} severity="success">
                    Account Berhasil Terdaftar
                </Alert>
            </Snackbar>
            <Snackbar open={openAddErrorSnackbar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    Semua Kolom Harus Terisi
                </Alert>
            </Snackbar>
            <Snackbar open={openPasswordErrorSnackbar} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                    Password Tidak Sesuai!
                </Alert>
            </Snackbar>

            {/* DIALOGS */}
            <Dialog open={openAddDialog} onClose={handleAddClose} aria-labelledby="form-dialog-title" style={{width: '500px', margin: 'auto', textAlign: 'center'}}>
                <DialogTitle id="form-dialog-title">Register New Account</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        value={newForm.name}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, name: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        value={newForm.username}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, username: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        value={newForm.password}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, password: e.target.value
                            })
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        value={newForm.confirmPassword}
                        onChange={(e) => {
                            setNewForm({
                                ...newForm, confirmPassword: e.target.value
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
                    let flag = true
                    for (let keys in payload) {
                        if (!payload[keys]) flag = false
                    }

                    if (!flag) setopenAddErrorSnackbar(true)
                    else if (payload.password !== payload.confirmPassword) setopenPasswordErrorSnackbar(true)
                    else {
                        setopenAddErrorSnackbar(false)
                        handleAddClose()

                        dispatch(REGISTER_ACCOUNT(payload))

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