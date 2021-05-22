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
    DialogActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import loading_gif from '../assets/loading.gif'
import { FETCH_SURAT_MASUK } from '../store/actions';
import SuratMasukRow from '../components/SuratMasukRow'

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
        maxHeight: 550,
        }
})


export default function SuratMasuk () {
    const dispatch = useDispatch()
    const suratMasukData = useSelector(state => state.SuratMasukReducer.datas)
    const [filteredArray, setFilteredArray] = useState(null)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const style = useStyle()
    const history = useHistory()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('')
    const [newForm, setNewForm] = useState({

    })
    let today = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }).split(',')[0].split('/')
    if (today[0] < 10) today[0] = `0${today[0]}`
    if (today[1] < 10) today[1] = `0${today[1]}`
    today = `${today[2]}-${today[0]}-${today[1]}`
    
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push('/auth')
        } else {
            dispatch(FETCH_SURAT_MASUK())
        }
    }, [])

    useEffect(() => {
        if (filter) {
            let filtered = suratMasukData.filter(surat => (
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
                surat.DisposisiSeksie.join('').toLowerCase().includes(filter)
                ||
                surat.DisposisiStaff.join('').toLowerCase().includes(filter)
            ))
            console.log(filter, '<<< filter');
            console.log(filtered, '<<< filtered');

            setFilteredArray(filtered)
        } else {
            setFilteredArray(null)
        }
    }, [filter])

    const handleAddClose = () => {
        setOpenAddDialog(false);
        // setEditFormValue({
        //     Tanggal: new Date(`${props.Tanggal} 12:00:00`).toISOString().split('T')[0],
        //     AsalSurat: props.AsalSurat,
        //     Perihal: props.Perihal,
        //     NoAgendaDit : props.NoAgendaDit,
        //     NoAgendaSubdit : props.NoAgendaSubdit,
        //     NomorSurat : props.NomorSurat,
        //     TanggalSurat : new Date(`${props.TanggalSurat} 12:00:00`).toISOString().split('T')[0],
        //     Tujuan: props.Tujuan,
        //     DisposisiSeksie: props.DisposisiSeksie.join(', '),
        //     IsiDisposisi: props.IsiDisposisi,
        //     DisposisiStaff: props.DisposisiStaff.join(', '),
        //     Catatan: props.Catatan
        // })
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log(today, '<<< hari ini');

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
                        <Typography variant="h2" className={style.text}>
                            SURAT MASUK
                        </Typography>
                        <br/>
                            {suratMasukData ?
                                <>
                                    <div style={{textAlign: 'left', width: '100%', marginLeft: '4%', marginBottom: '10px', marginTop: '0', display: 'flex', justifyContent: 'space-between'}}>
                                        <TextField label="Cari di sini" size="small" style={{width: '400px', margin: '20px', textAlign: 'left'}} onChange={(e) => setFilter(e.target.value)} helperText="Asal Surat, Nomor Surat, Tanggal, Tujuan, Nama Staff/Seksie"/>
                                        <Button size='small' variant='contained' color='primary' style={{width: '100px', margin: '20px', marginRight: '9%', height: '30px', marginTop: '60px'}} onClick={() => setOpenAddDialog(true)}>NEW</Button>
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
                                                        style={{ width: '35%', textAlign: 'center' }}
                                                    >
                                                        Asal Surat
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '40%', textAlign: 'center' }}
                                                    >Perihal
                                                    </TableCell>
                                                    <TableCell
                                                        align={'right'}
                                                        style={{ width: '5%', textAlign: 'center' }}
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
                                                            <SuratMasukRow props={SuratMasuk} />
                                                        )
                                                    })

                                                    :
                                                    suratMasukData ? (rowsPerPage > 0 ? suratMasukData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    :
                                                    suratMasukData).map(SuratMasuk => {
                                                        return (
                                                            <SuratMasukRow props={SuratMasuk} />
                                                        )
                                                    }): ''}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                        rowsPerPageOptions={[10, 25, 50]}
                                        component="div"
                                        count={filteredArray ? filteredArray.length : suratMasukData ? suratMasukData.length : 0}
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

            {/* DIALOGS */}
            <Dialog open={openAddDialog} onClose={handleAddClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" style={{margin: 'auto', textAlign: 'center'}}>Buat Disposisi Baru</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Tanggal"
                        type="date"
                        defaultValue={today}
                        // defaultValue='2021-5-22'
                        InputLabelProps={{shrink: true}}
                        onChange={(e) => {
                            console.log(e.target.value, '<<<<');
                        }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nomor Agenda Direktur"
                        type="text"
                        // value={editFormValue.NoAgendaDit}
                        // onChange={(e) => {
                        //     setEditFormValue({
                        //         ...editFormValue, NoAgendaDit: e.target.value
                        //     })
                        // }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Asal Surat"
                        type="text"
                        // value={editFormValue.AsalSurat}
                        // onChange={(e) => {
                        //     setEditFormValue({
                        //         ...editFormValue, AsalSurat: e.target.value
                        //     })
                        // }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Perihal"
                        type="text"
                        // value={editFormValue.Perihal}
                        // onChange={(e) => {
                        //     setEditFormValue({
                        //         ...editFormValue, Perihal: e.target.value
                        //     })
                        // }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nomor Surat"
                        type="text"
                        // value={editFormValue.NomorSurat}
                        // onChange={(e) => {
                        //     setEditFormValue({
                        //         ...editFormValue, NomorSurat: e.target.value
                        //     })
                        // }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tanggal Surat"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        // value={editFormValue.TanggalSurat}
                        // onChange={(e) => {
                        //     setEditFormValue({
                        //         ...editFormValue, TanggalSurat: e.target.value
                        //     })
                        // }}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Tujuan"
                        type="text"
                        // value={editFormValue.Tujuan}
                        // onChange={(e) => {
                        //     setEditFormValue({
                        //         ...editFormValue, Tujuan: e.target.value
                        //     })
                        // }}
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
                    handleAddClose()
                //     let newDispoSeksie = editFormValue.DisposisiSeksie.split(',')
                //     let newDispoStaff = editFormValue.DisposisiStaff.split(',')
                //     newDispoSeksie = newDispoSeksie.map(seksie => seksie.trim())
                //     newDispoStaff = newDispoStaff.map(staff => staff.trim())
                //     const payload = ({
                //         ...editFormValue,
                //         DisposisiStaff: newDispoStaff,
                //         DisposisiSeksie: newDispoSeksie,
                //         id: props.id
                //     })

                //     for (let keys in payload) {
                //         console.log(payload[keys] , '<<< payload[keys]');
                //         if (!payload[keys]) payload[keys] = '-'
                //     }

                //     dispatch(EDIT_SURAT_MASUK(payload))
                    
                //     let tempTanggal = new Date(`${payload.Tanggal} 12:00:00`).toISOString().split('T')[0]
                //     let tempTanggalSurat = new Date(`${payload.TanggalSurat} 12:00:00`).toISOString().split('T')[0]
                //     const temp = ({
                //         ...payload,
                //         Tanggal: tempTanggal,
                //         TanggalSurat: tempTanggalSurat,
                //         DisposisiSeksie: newDispoSeksie.join(', '),
                //         DisposisiStaff: newDispoStaff.join(', ')
                //     })
                //     setEditFormValue(temp)
                    
                }}
                color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog>




        </div>
    )
    
}