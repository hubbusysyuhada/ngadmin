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
    TextField
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
    const currentTime = new Date()
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri' ,'sat']
    const today = days[currentTime.getDay()]
    const timeNow = currentTime.getHours()
    const style = useStyle()
    const history = useHistory()
    const restaurantCache = []
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('')
    
    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            history.push('/auth')
        } else {
            dispatch(FETCH_SURAT_MASUK())
        }
        console.log(suratMasukData, '<<<< surat masuk data dari halaman surat masuk');
    }, [])

    useEffect(() => {
        // if (filter) {
        //     let filtered = tempRestaurants.filter(resto => resto.name.toLowerCase().includes(filter.toLowerCase()) || resto.status.toLowerCase().includes(filter.toLowerCase()))
        //     state_restaurants(filtered)
        // } else {
        //     state_restaurants(tempRestaurants)
        // }
    }, [filter])

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
                        <Typography variant="h2" className={style.text}>
                            SURAT MASUK
                        </Typography>
                        {/* <p>{JSON.stringify(suratMasukData)} data redux</p> */}
                        <br/>
                            {suratMasukData ?
                                <>
                                    <div style={{textAlign: 'left', width: '100%', marginLeft: '4%', marginBottom: '10px', marginTop: '0'}}>
                                        <TextField label="looking for something?" size="small" style={{width: '300px', margin: '20px', textAlign: 'left'}} onChange={(e) => setFilter(e.target.value)}/>
                                        <br/>
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
                                                    {suratMasukData ? (rowsPerPage > 0 ? suratMasukData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                        count={suratMasukData ? suratMasukData.length : 0}
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
        </div>
    )
    
}