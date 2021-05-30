import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Grid,
    Divider,
    TextField,
    Button,
    Snackbar,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../assets/login.png'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert';
import { SET_USER, TURN_OFF_LOGIN_ERROR, USER_LOGIN } from '../store/actions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles({
    container : {
        height: '95vh'
    },
    item: {
        margin: 'auto',
        textAlign: 'center'
    },
    image: {
        height: '750px'
    },
    divider: {
        width: "80%",
        margin: "auto",
        textAlign: "center",
        marginBottom: '10px'
    },
    text : {
        fontFamily: 'monospace'
    },
    input: {
        margin: '5px',
        width: '70%',
        textAlign: 'center'
    }
})

export default function Auth () {
    const dispatch = useDispatch()
    const loginError = useSelector(state => state.AuthReducer.loginError)
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser)
    const style = useStyle()
    const history = useHistory()
    const [openError, setOpenError] = useState(false)
    const [openRegError, setOpenRegError] = useState(false)
    const [yearIsFilled, setYearIsFilled] = useState(true)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        year: ''
    })

    console.log(loggedUser, '<<<< logged user');
    console.log(openSuccess, '<<<< open success');

    useEffect(() => {
        if (loginError) {
            setOpenError(true)
            dispatch(TURN_OFF_LOGIN_ERROR())
        }
    }, [loginError])

    useEffect(() => {
        if (loggedUser && loggedUser.access_token && loggedUser.name && localStorage.getItem('access_token') && localStorage.getItem('year') && localStorage.getItem('name')) {
            setOpenSuccess(true)
            setTimeout(() => {
                setOpenSuccess(false)
                history.push('/')
            }, 2000)
        }
    }, [loggedUser])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenError(false);
        setOpenSuccess(false);
        setOpenRegError(false);
    };

    useEffect(() => {
        if (localStorage.getItem('access_token') && localStorage.getItem('name') && localStorage.getItem('year')) {
            if (!loggedUser) dispatch(SET_USER())
            history.push('/')
        }
    }, [])

    function login (event) {
        event.preventDefault()
        if (!userInput.year) setYearIsFilled(false)
        else if (!userInput.username || !userInput.password) setOpenError(true)
        else dispatch(USER_LOGIN(userInput))
    }

    return (
        <div>
            <Grid container spacing={3} className={style.container}>
                <Grid item xs={6} className={style.item}>
                    <img src={Logo} alt="image cannot be shown" className={style.image}/>
                </Grid>
                <Grid item xs={6} className={style.item}>
                    <>
                        <h1 className={style.text}> NGADMIN </h1>
                        <h4 className={style.text}> SUB DIREKTORAT PEMBENTUKAN WILAYAH DAN ALOKASI PEMANFAATAN SDH </h4>
                    </>
                    <Divider className={style.divider}/>
                    <div>
                        <TextField
                        size="small"
                        type="text"
                        label="Username"
                        name="Username"
                        variant="outlined"
                        className={style.input}
                        onChange={(e) => setUserInput({
                            ...userInput, username: e.target.value
                        })}
                        />
                        <TextField
                        size="small"
                        type="password"
                        name="Password"
                        label="Password"
                        variant="outlined"
                        className={style.input}
                        onChange={(e) => setUserInput({
                            ...userInput, password: e.target.value
                        })}
                        />
                        <br/>
                        <FormControl variant='outlined' className={style.input} size="small" error={yearIsFilled ? false : true}>
                            <InputLabel>Year</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="year-selection"
                            name="Year"
                            value={userInput.year}
                            onChange={(e) => setUserInput({
                                ...userInput, year: e.target.value
                            })}
                            label="Year"
                            style={{textAlign: 'left'}}
                            >
                                <MenuItem value={2021} id="year-2021">2021</MenuItem>
                                <MenuItem value={2022} id="year-2022">2022</MenuItem>
                                <MenuItem value={2023} id="year-2023">2023</MenuItem>
                                <MenuItem value={2024} id="year-2024">2024</MenuItem>
                                <MenuItem value={2025} id="year-2025">2025</MenuItem>
                            </Select>
                            <FormHelperText> {yearIsFilled ? '' : 'Please select year'} </FormHelperText>
                        </FormControl>
                        <br/>
                        <Button className={style.text} onClick={login}>Login</Button>
                        <p className={style.text}>Don't have account? <a href="" onClick={(event) => {
                            event.preventDefault()
                            setOpenRegError(true)
                        }}>register</a></p>
                    </div>
                    
                </Grid>
            </Grid>
            <div className={style.item}>
                <h5 className={style.text}>Developed by Muhammad Hafidz Hubbusysyuhada <br/> 2021</h5>
            </div>
            <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                Invalid Username/Password!
                </Alert>
            </Snackbar>
            <Snackbar open={openRegError} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error">
                PLEASE CONTACT ADMIN TO REGISTER YOUR ACCOUNT
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="success">
                Welcome {localStorage.getItem('name')}! Redirecting...
                </Alert>
            </Snackbar>
        </div>
    )
}