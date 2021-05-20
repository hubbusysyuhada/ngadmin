import { axios } from '../helpers/axios'
const baseUrl = 'http://localhost:3000/'

export function USER_LOGIN (param) {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/login', {
                username: param.username,
                password: param.password
            })
            if (data) {
                dispatch({type: 'auth/login', payload: data})
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('year', param.year)
                // history.push('/')
            }
        } catch (error) {
            dispatch({type: 'auth/loginError'})
            console.log(error, '<<< error');
            return error
        }
    }
}

export function USER_LOGOUT () {
    return (dispatch) => {
        dispatch({type: 'auth/logout'})
    }
}

export function TURN_OFF_LOGIN_ERROR () {
    return (dispatch) => {
        dispatch({type: 'auth/turnOffLoginError'})
    }
}


export function FETCH_SURAT_MASUK () {
    return async (dispatch) => {
        const {data} = await axios({
            method: 'GET',
            url: `${baseUrl}suratmasuk`,
            headers: {
                year: 2021,
                access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTYxOTkyNjM5OH0.A5KeUT7uHTFF2V0Sp1fT5lWhqcQB6WwhbS_4U606Bck'
            }
        })
    }
}